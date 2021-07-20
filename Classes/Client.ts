import { Client, Intents, Collection } from "discord.js";
import { readdirSync } from "fs";
import Config from "../constants/config";
import Logger from "../helpers/logger";
import Command from "../constants/command";
import Event from "../constants/event";
import NewMessageEmbed from "../helpers/MessageEmbed";

export const numberOfCommands: any = []
export const totalCommands: any = numberOfCommands[0] + numberOfCommands[1] + numberOfCommands[2] + numberOfCommands[3] + numberOfCommands[4] + numberOfCommands[5] + numberOfCommands[6] + numberOfCommands[7] + numberOfCommands[8] + numberOfCommands[9] + numberOfCommands[10]

export const AdminCommands: any = []
export const EventsCommands: any = []
export const FunCommands: any = []
export const GamesCommands: any = []
export const GeneralCommands: any = []
export const MISCCommands: any = []
export const MusicCommands: any = []
export const NotifyCommands: any = []
export const NSFWCommnads: any = []
export const OwnerCommands: any = []
export const SearchCommands: any = []

export default class FalconClient extends Client {
    public prefix: string;
    public commands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, string> = new Collection();
    public logger = Logger;
    public ownerID: string;
    public emotes;
    public shit;
    public MessageEmbed = NewMessageEmbed;
    public distube: any;
    public reactionRole: any;
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
        this._loadAdminCommands(config.commandDir)
        this._loadFunCommands(config.commandDir)
        this._loadEventsCommands(config.commandDir)
        this._loadGamesCommands(config.commandDir)
        this._loadGeneralCommands(config.commandDir)
        this._loadMISCCommands(config.commandDir)
        this._loadMusicCommands(config.commandDir)
        this._loadNotifyCommands(config.commandDir)
        this._loadNSFWCommands(config.commandDir)
        this._loadOwnerCommands(config.commandDir)
        this._loadSearchCommands(config.commandDir)

        this.login(config.token);
    }

    private _loadCommands(commandDir: string): void {
        readdirSync(commandDir)
            .forEach(async (dir: string) => {
                const files = readdirSync(`${commandDir}/${dir}`);

                numberOfCommands.push(files.length)

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

    private async _loadAdminCommands(commandDir: string) {
        const files = readdirSync(`${commandDir}/admin`);

        for (const file of files) {
            const pseudoPull = await import(`${commandDir}/admin/${file}`);

            const pull: Command = pseudoPull.default;

            AdminCommands.push(`**${pull.name}** - ${pull.description}`)
        }
    }

    private async _loadEventsCommands(commandDir: string) {
        const files = readdirSync(`${commandDir}/events`);

        for (const file of files) {
            const pseudoPull = await import(`${commandDir}/events/${file}`);

            const pull: Command = pseudoPull.default;

            EventsCommands.push(`**${pull.name}** - ${pull.description}`)
        }
    }

    private async _loadFunCommands(commandDir: string) {
        const files = readdirSync(`${commandDir}/fun`);

        for (const file of files) {
            const pseudoPull = await import(`${commandDir}/fun/${file}`);

            const pull: Command = pseudoPull.default;

            FunCommands.push(`**${pull.name}** - ${pull.description}`)
        }
    }

    private async _loadGamesCommands(commandDir: string) {
        const files = readdirSync(`${commandDir}/games`);

        for (const file of files) {
            const pseudoPull = await import(`${commandDir}/games/${file}`);

            const pull: Command = pseudoPull.default;

            GamesCommands.push(`**${pull.name}** - ${pull.description}`)
        }
    }

    private async _loadGeneralCommands(commandDir: string) {
        const files = readdirSync(`${commandDir}/general`);

        for (const file of files) {
            const pseudoPull = await import(`${commandDir}/general/${file}`);

            const pull: Command = pseudoPull.default;

            GeneralCommands.push(`**${pull.name}** - ${pull.description}`)
        }
    }

    private async _loadMISCCommands(commandDir: string) {
        const files = readdirSync(`${commandDir}/misc`);

        for (const file of files) {
            const pseudoPull = await import(`${commandDir}/misc/${file}`);

            const pull: Command = pseudoPull.default;

            MISCCommands.push(`**${pull.name}** - ${pull.description}`)
        }
    }

    private async _loadMusicCommands(commandDir: string) {
        const files = readdirSync(`${commandDir}/music`);

        for (const file of files) {
            const pseudoPull = await import(`${commandDir}/music/${file}`);

            const pull: Command = pseudoPull.default;

            MusicCommands.push(`**${pull.name}** - ${pull.description}`)
        }
    }

    private async _loadNotifyCommands(commandDir: string) {
        const files = readdirSync(`${commandDir}/notify`);

        for (const file of files) {
            const pseudoPull = await import(`${commandDir}/notify/${file}`);

            const pull: Command = pseudoPull.default;

            NotifyCommands.push(`**${pull.name}** - ${pull.description}`)
        }
    }

    private async _loadNSFWCommands(commandDir: string) {
        const files = readdirSync(`${commandDir}/nsfw`);

        for (const file of files) {
            const pseudoPull = await import(`${commandDir}/nsfw/${file}`);

            const pull: Command = pseudoPull.default;

            NSFWCommnads.push(`**${pull.name}** - ${pull.description}`)
        }
    }

    private async _loadOwnerCommands(commandDir: string) {
        const files = readdirSync(`${commandDir}/owner`);

        for (const file of files) {
            const pseudoPull = await import(`${commandDir}/owner/${file}`);

            const pull: Command = pseudoPull.default;

            OwnerCommands.push(`**${pull.name}** - ${pull.description}`)
        }
    }

    private async _loadSearchCommands(commandDir: string) {
        const files = readdirSync(`${commandDir}/search`);

        for (const file of files) {
            const pseudoPull = await import(`${commandDir}/search/${file}`);

            const pull: Command = pseudoPull.default;

            SearchCommands.push(`**${pull.name}** - ${pull.description}`)
        }
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