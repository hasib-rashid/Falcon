import { Client, Intents, Collection, MessageEmbed, MessageEmbedOptions, Message } from "discord.js";
import { readdir } from "fs/promises";
import { join } from "path";
import BaseEvent from "./BaseEvent";
import BaseSlashCommand from "./BaseSlashCommand";
import Logger from "./Logger";
import glob from 'glob'
import { promisify } from 'util';
import { Command } from "../interfaces/Command";
import Nuggies from 'nuggies'
import { UtilsManager } from "../util/Utils";
import { formatNumber } from "../util/functions";

const globPromise = promisify(glob)

export const numberOfCommands: any = []

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

export let totalCommands: any

export default class Falcon extends Client {
	public slashcommands: Collection<string, BaseSlashCommand> = new Collection();
	public logger = new Logger();
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public cooldowns: Collection<string, number> = new Collection();
	public owners: Array<string> | any;
	public utils: UtilsManager | any;
	public react;
	public distube;

	constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_PRESENCES,
				Intents.FLAGS.GUILD_VOICE_STATES
			],
			allowedMentions: {
				parse: ["everyone", "roles", "users"],
				repliedUser: false,
			},
		});
	}

	public async start(): Promise<void> {
		await this.__loadEvents();
		await this.__loadSlashCommands();
		this.login(process.env.TOKEN);

		Nuggies.handleInteractions(this);

		await this._loadAdminCommands()
		await this._loadGamesCommands()
		await this._loadFunCommands()
		await this._loadGeneralCommands()
		await this._loadMISCCommands()
		await this._loadNSFWCommands()
		await this._loadOwnerCommands()
		await this._loadSearchCommands()

		await this.__loadCommands();

		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/**/*{.js,.ts}`
		);

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			this.commands.set(cmd.name, { cooldown: 3000, ...cmd });
			if (cmd.aliases) {
				cmd.aliases.map((alias: string) => this.aliases.set(alias, cmd.name));
			}
		});
	}

	private async __loadCommands() {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/**/*{.js,.ts}`
		);

		totalCommands = commandFiles.length + 2
	}

	private async __loadSlashCommands() {
		const subDirs = await readdir(join(__dirname, "../slashcommands"));

		for (const subDir of subDirs) {
			const files = await readdir(join(__dirname, "../slashcommands", subDir));

			for (const file of files) {
				const pseudoPull = await import(join(__dirname, "../slashcommands", subDir, file));

				const pull: BaseSlashCommand = new pseudoPull.default(this);

				this.slashcommands.set(pull.config.name, pull);

				this.logger.success("client/commands", `Loaded command ${pull.config.name}`);
			}
		}
	}

	private async __loadEvents() {
		const files = await readdir(join(__dirname, "../Events"));

		for (const file of files) {
			const pseudoPull = await import(join(__dirname, "../Events", file));

			const pull: BaseEvent = new pseudoPull.default(this);

			this.on(pull.name, async (...args: any[]) => await pull.run(...args));

			this.logger.success("client/events", `Listening for event ${pull.name}`);
		};
	}

	private async _loadCommands() {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/**/*{.js,.ts}`
		);

		numberOfCommands.push(commandFiles.length)
	}

	private async _loadAdminCommands() {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/admin/*{.js,.ts}`
		);

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			AdminCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadFunCommands() {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/fun/*{.js,.ts}`
		);

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			FunCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadGamesCommands() {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/games/*{.js,.ts}`
		);

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			GamesCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadGeneralCommands() {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/general/*{.js,.ts}`
		);

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			GeneralCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadMISCCommands() {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/misc/*{.js,.ts}`
		);

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			MISCCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadMusicCommands() {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/music/*{.js,.ts}`
		);

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			MusicCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadNSFWCommands() {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/nsfw/*{.js,.ts}`
		);

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			NSFWCommnads.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadOwnerCommands() {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/owner/*{.js,.ts}`
		);

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			OwnerCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}

	private async _loadSearchCommands() {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/search/*{.js,.ts}`
		);

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			SearchCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}
}