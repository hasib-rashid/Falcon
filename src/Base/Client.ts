import { Client, Intents, Collection } from "discord.js";
import { readdir } from "fs/promises";
import { join } from "path";
import BaseEvent from "./BaseEvent";
import BaseSlashCommand from "./BaseSlashCommand";
import Logger from "./Logger";

export default class CodeFictionist extends Client {
	public commands: Collection<string, BaseSlashCommand> = new Collection();
	public logger = new Logger();

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

	public async start() {
		await this.__loadEvents();
		await this.__loadCommands();
		this.login(process.env.TOKEN);
	}

	private async __loadCommands() {
		const subDirs = await readdir(join(__dirname, "../Commands"));

		for(const subDir of subDirs) {
			const files = await readdir(join(__dirname, "../Commands", subDir));

			for(const file of files) {
				const pseudoPull = await import(join(__dirname, "../Commands", subDir, file));

				const pull: BaseSlashCommand = new pseudoPull.default(this);

				this.commands.set(pull.config.name, pull);

				this.logger.success("client/commands", `Loaded command ${pull.config.name}`);
			}
		}
	}

	private async __loadEvents() {
		const files = await readdir(join(__dirname, "../Events"));

		for(const file of files) {
			const pseudoPull = await import(join(__dirname, "../Events", file));

			const pull: BaseEvent = new pseudoPull.default(this);

			this.on(pull.name, async (...args: any[]) => await pull.run(...args));

			this.logger.success("client/events", `Listening for event ${pull.name}`);
		};
	}
}