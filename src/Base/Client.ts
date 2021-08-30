import { Client, Intents, Collection, MessageEmbed, MessageEmbedOptions, Message } from "discord.js";
import { readdir } from "fs/promises";
import { join } from "path";
import BaseEvent from "./BaseEvent";
import BaseSlashCommand from "./BaseSlashCommand";
import Logger from "./Logger";
import glob from 'glob'
import { promisify } from 'util';
import { Command } from "../interfaces/Command";
import { Config } from "../interfaces/Config";
import Nuggies from 'nuggies'
import { UtilsManager } from "../util/Utils";

const globPromise = promisify(glob)

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

export default class Falcon extends Client {
	public slashcommands: Collection<string, BaseSlashCommand> = new Collection();
	public logger = new Logger();
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public cooldowns: Collection<string, number> = new Collection();
	public owners: Array<string> | any;
	public utils: UtilsManager | any;
	public react;

	constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_PRESENCES,
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
		await this.__loadCommands();
		this.login(process.env.TOKEN);

		this._loadAdminCommands()
		this._loadGamesCommands()
		this._loadGeneralCommands()
		this._loadMISCCommands()
		this._loadNSFWCommands()
		this._loadOwnerCommands()
		this._loadSearchCommands()

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
			`${__dirname}/../commands/admin/*{.js,.ts}`
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