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
import { Config } from '../interfaces/Config';
import EventEmitter from 'events';

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

		this._loadGeneralCommands(config.commandDir)

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

	private async _loadGeneralCommands(commandDir: string) {
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/**/*{.js,.ts}`
		);

		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			GeneralCommands.push(`**${cmd.name}** - ${cmd.description}`)
		});
	}
}
export { Falcon };
