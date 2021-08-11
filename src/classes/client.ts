import { Client, Intents, Collection, Message, MessageEmbed } from "discord.js";
import { readdirSync } from "fs";
import Config from "../typings/config";
import Logger from "../helpers/logger";
import Command from "../typings/command";
import Event from "../typings/event";
import DisTube from "distube";
import disbut from 'discord-buttons'
import Queue from "distube/typings/Queue";
import { formatNumber } from "../util/Util";

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
    public distube: any;
    public reactionRole: any;
    public moderator: any;
    // @ts-ignore
    public countryCache: CountryResponse[];

    constructor(config: Config) {
        super({
            ws: {
                intents: Intents.ALL,
                properties: { $browser: "Discord Android" },
            },
        });

        this.prefix = config.prefix || "`";
        this.ownerID = config.ownerID;
        this.emotes = config.emotes;
        this.shit = "BullSHIT"

        this._loadCommands(config.commandDir);
        this._loadEvents(config.eventDir);

        this.login(config.token);
        
        
        const distube = new DisTube(this, {
            youtubeCookie: "",
            searchSongs: false,
            emitNewSongOnly: false,
            highWaterMark: 1 << 25,
            leaveOnEmpty: true,
            leaveOnFinish: true,
            leaveOnStop: true,
            customFilters: {
                clear: "dynaudnorm=f=200",
                bassboost: "bass=g=20,dynaudnorm=f=200",
                "8d": "apulsator=hz=0.08",
                vaporwave: "aresample=48000,asetrate=48000*0.8",
                nightcore: "aresample=48000,asetrate=48000*1.25",
                phaser: "aphaser=in_gain=0.4",
                purebass: "bass=g=20,dynaudnorm=f=200,asubboost",
                tremolo: "tremolo",
                vibrato: "vibrato=f=6.5",
                reverse: "areverse",
                treble: "treble=g=5",
                surrounding: "surround",
                pulsator: "apulsator=hz=1",
                subboost: "asubboost",
                karaoke: "stereotools=mlev=0.03",
                flanger: "flanger",
                gate: "agate",
                haas: "haas",
                mcompand: "mcompand",
            },
        });
        
        this.distube = distube

        disbut(this)

        distube
            .on("playSong", async (message: Message, queue: Queue, song: any) => {
                const voiceChannelName = message.member?.voice.channel?.name;
                try {
                    let embed1 = new MessageEmbed()

                        .setColor("GREEN")
                        .setAuthor(
                            message.author.username,
                            message.author.displayAvatarURL()
                        )
                        .setTitle(
                            `Playing in \`${voiceChannelName}\`! `
                        )
                        .setDescription(
                            `<:youtube:864559346137956402> **[${song.name}](${song.url})** \n\n **Requested By: <@${message.author.id}>**\n\n`
                        )
                        .addFields(
                            { name: "Views", value: formatNumber(song.views) },
                            {
                                name: "Likes :thumbsup:",
                                value: formatNumber(song.likes),
                                inline: true,
                            },
                            {
                                name: "DisLikes :thumbsdown:",
                                value: formatNumber(song.dislikes),
                                inline: true,
                            }
                        )
                        .setFooter(`Duration [${song.formattedDuration}]`)
                        .setThumbnail(song.thumbnail);

                    message.channel.send(embed1);
                } catch (err) {
                    console.error(err);
                }
            })
            .on("addSong", (message: Message, queue: Queue, song: any) => {
                const embed = new MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL()
                    )
                    .setTitle("Added a Song!")
                    .setColor("GREEN")
                    .setDescription(
                        `Song: [\`${song.name}\`](${song.url})  -  \`${song.formattedDuration
                        }\` \n\nRequested by: ${song.user}\n\nEstimated Time: ${queue.songs.length - 1
                        } song(s) - \`${(
                            Math.floor(((queue.duration - song.duration) / 60) * 100) /
                            100
                        )
                            .toString()
                            .replace(".", ":")}\`\nQueue duration: \`${queue.formattedDuration
                        }\``
                    )
                    .setThumbnail(song.thumbnail);

                message.channel.send(embed);
            })
            .on("searchCancel", (message: Message) =>
                message.channel.send(`**Searching canceled**`)
            )
            .on("error", (message: Message, e: any) => {
                console.error(e);
                message.channel.send("An error encountered: " + e);
            })
            .on("initQueue", (queue: Queue) => {
                queue.autoplay = false;
                queue.volume = 50;
            })
            .on("empty", (message: Message) => {
                distube.stop(message);
                message.channel.send(
                    "**Channel is Empty. Cleared the queue and left the voice channel!**"
                );
            })
            .on("noRelated", (message: Message) =>
                message.channel.send(
                    "**Can't find related video to play. Stop playing music.**"
                )
            )
            .on("finish", (message: Message) =>
                message.channel.send("**No more song in queue to play. Add More!**")
            );
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