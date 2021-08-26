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
import { UtilsManager } from "../util/Utils";

const globPromise = promisify(glob)

export default class CodeFictionist extends Client {
	public slashcommands: Collection<string, BaseSlashCommand> = new Collection();
	public logger = new Logger();
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public cooldowns: Collection<string, number> = new Collection();
	public owners: Array<string> | any;
	public utils: UtilsManager | any;

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
}