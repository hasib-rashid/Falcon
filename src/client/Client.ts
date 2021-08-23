import { config } from 'dotenv'
config()

import consola, { Consola } from 'consola';
import {
	Client,
	Collection,
	Intents,
	Message,
	MessageEmbed,
	MessageEmbedOptions,
} from 'discord.js';
import discordButtons from 'discord-buttons';
import { UtilsManager } from '../utils/Utils';
import glob from 'glob';
import { promisify } from 'util';
import mongoose from 'mongoose';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import { Schema } from '../interfaces/Schema';
import DisTube from "distube";
import { Config } from '../interfaces/Config';
import { ReactionRoleManager } from "discord.js-collector"
import EventEmitter from 'events';
import Nuggies from 'nuggies'
import Queue from 'distube/typings/Queue';
import { formatNumber } from '../utils/functions';
import { readdirSync } from 'fs';

Nuggies.connect(process.env.MONGO_URL)

export const numberOfCommands: any = []
export const totalCommands: any = numberOfCommands[0] + numberOfCommands[1] + numberOfCommands[2] + numberOfCommands[3] + numberOfCommands[4] + numberOfCommands[5] + numberOfCommands[6] + numberOfCommands[7] + numberOfCommands[8] + numberOfCommands[9] + numberOfCommands[10]

export let AdminNumber
export let EventsNumber
export let FunNumber
export let GamesNumber
export let GeneralNumber
export let MISCNumber
export let MusicNumber
export let NotifyNumber
export let NSFWNumber
export let OwnerNumber
export let SearchNumber

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

const globPromise = promisify(glob);
class Falcon extends Client {
	public logger: Consola = consola;
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public cooldowns: Collection<string, number> = new Collection();
	public schemas: Collection<string, Schema> = new Collection();
	public categories: Set<string> = new Set();
	public utils: UtilsManager;
	public prefix: string;
	public reactionRoles;
	public distube;
	public owners: Array<string>;
	public config: Config;
	public constructor() {
		super({
			ws: { intents: Intents.ALL },
			partials: ['MESSAGE', 'GUILD_MEMBER', 'CHANNEL', 'REACTION', 'USER'],
		});
	}
	public async start(config: Config): Promise<void> {
		this.config = config;
		this.prefix = config.prefix;
		this.owners = config.owners;
		this.login(config.token).catch((e) => this.logger.error(e));
		discordButtons(this)

		Nuggies.handleInteractions(this)

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

		// @ts-ignore
		const reactionRoleManager = new ReactionRoleManager(this, { mongoDbLink: process.env.MONGO_URL });
		this.reactionRoles = reactionRoleManager

		this._loadCommands(config.commandDir)

		this._loadGeneralCommands(config.commandDir)
		this._loadAdminCommands(config.commandDir)
		this._loadFunCommands(config.commandDir)
		this._loadGamesCommands(config.commandDir)
		this._loadMISCCommands(config.commandDir)
		this._loadMusicCommands(config.commandDir)
		this._loadNSFWCommands(config.commandDir)
		this._loadOwnerCommands(config.commandDir)
		this._loadSearchCommands(config.commandDir)

		mongoose
			.connect(config.mongoURI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.catch((e) => this.logger.error(e));

		this.utils = new UtilsManager(this);
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/**/*{.js,.ts}`
		);
		const eventFiles: string[] = await globPromise(
			`${__dirname}/../events/**/*{.js,.ts}`
		);
		const schemaFiles: string[] = await globPromise(
			`${__dirname}/../models/**/*{.js,.ts}`
		);
		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			this.commands.set(cmd.name, { cooldown: 3000, ...cmd });
			if (cmd.aliases) {
				cmd.aliases.map((alias: string) => this.aliases.set(alias, cmd.name));
			}
			this.categories.add(cmd.category);
		});
		eventFiles.map(async (eventFile: string) => {
			const ev = (await import(eventFile)) as Event;
			if (ev.emitter && typeof ev.emitter == 'function') {
				ev.emitter(this).on(ev.name, ev.run.bind(null, this));
			} else if (ev.emitter && ev.emitter instanceof EventEmitter) {
				(ev.emitter as EventEmitter).on(ev.name, ev.run.bind(null, this));
			} else {
				this.on(ev.name, ev.run.bind(null, this));
			}
		});
		schemaFiles.map(async (schemaFile: string) => {
			const sch = (await import(schemaFile)) as Schema;
			this.schemas.set(sch.name, sch);
		});
	}
	public embed(data: MessageEmbedOptions, message: Message): MessageEmbed {
		return new MessageEmbed({
			color: 'RANDOM',
			...data,
			footer: {
				text: `${message.author.tag} | Falcon`,
				iconURL: message.author.displayAvatarURL({
					dynamic: true,
					format: 'png',
				}),
			},
		});
	}

	private async _loadCommands(commandDir: string) {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/**/*{.js,.ts}`
		);

		numberOfCommands.push(commandFiles.length)
	}

	private async _loadAdminCommands(commandDir: string) {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/admin/*{.js,.ts}`
		);

		AdminNumber = commandFiles.length

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			AdminCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadFunCommands(commandDir: string) {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/fun/*{.js,.ts}`
		);

		FunNumber = commandFiles.length

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			FunCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadGamesCommands(commandDir: string) {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/games/*{.js,.ts}`
		);

		GamesNumber = commandFiles.length

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			GamesCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadGeneralCommands(commandDir: string) {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/general/*{.js,.ts}`
		);

		GeneralNumber = commandFiles.length

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			GeneralCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadMISCCommands(commandDir: string) {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/misc/*{.js,.ts}`
		);

		MISCNumber = commandFiles.length

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			MISCCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadMusicCommands(commandDir: string) {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/music/*{.js,.ts}`
		);

		MusicNumber = commandFiles.length

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			MusicCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadNSFWCommands(commandDir: string) {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/nsfw/*{.js,.ts}`
		);

		NSFWNumber = commandFiles.length

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			NSFWCommnads.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadOwnerCommands(commandDir: string) {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/owner/*{.js,.ts}`
		);

		OwnerNumber = commandFiles.length

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			OwnerCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadSearchCommands(commandDir: string) {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/search/*{.js,.ts}`
		);

		SearchNumber = commandFiles.length

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			SearchCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}
}
export { Falcon };
