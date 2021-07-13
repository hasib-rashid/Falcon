import { Client, Intents, Collection } from "discord.js";
import { readdirSync } from "fs";
import Config from "../constants/config";
import Logger from "../helpers/logger";
import Command from "../constants/command";
import Event from "../constants/event";
import NewMessageEmbed from "../helpers/MessageEmbed";


export default class FalconClient extends Client {
    public prefix: string;
    public commands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, string> = new Collection();
    public logger = Logger;
    public ownerID: string;
    public emotes;
    public shit;
    public MessageEmbed = NewMessageEmbed;
    // @ts-ignore
    public countryCache: CountryResponse[];

    constructor(config: Config) {
        super({
            ws: {
                intents: Intents.ALL,
                properties: { $browser: "Discord Android" },
            },
            disableMentions: "everyone",
        });

        this.prefix = config.prefix || "`";
        this.ownerID = config.ownerID;
        this.emotes = config.emotes;
        this.shit = "BullSHIT"

        this._loadCommands(config.commandDir);
        this._loadEvents(config.eventDir);

        this.login(config.token);
    }

    private _loadCommands(commandDir: string): void {
        readdirSync(commandDir)
            .forEach(async (dir: string) => {
                const files = readdirSync(`${commandDir}/${dir}`);

                for (const file of files) {
                    const pseudoPull = await import(`${commandDir}/${dir}/${file}`);

                    const pull: Command = pseudoPull.default;

                    pull.category = dir;
                    if (!pull.credit) pull.credit = [];

                    pull.credit.push({
                        name: "Hasib Al Rashid",
                        reason: "Code",
                        URL: "https://github.com/hasib-rashid",
                    });

                    this.commands.set(pull.name.toLowerCase(), pull);

                    if (pull.aliases) for (const alias of pull.aliases) this.aliases.set(alias.toLowerCase(), pull.name.toLowerCase());

                    this.logger.success("client/commands", `Loaded command ${pull.name.toLowerCase()} successfully`);
                }
            });
    }

    private _loadEvents(eventDir: string) {
        readdirSync(eventDir)
            .forEach(async (file: string) => {
                const pseudoPull = await import(`${eventDir}/${file}`);

                const pull: Event = pseudoPull.default;

                this.on(pull.name, pull.run.bind(null, this));

                this.logger.success("client/events", `Listening for Event: ${pull.name}`);
            });
    }
}