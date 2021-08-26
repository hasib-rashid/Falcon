import { Message } from 'discord.js';
import { Falcon } from '../client/Client';
export interface ValidationResponse {
	value: boolean;
	fix: string;
	success: boolean;
}

export interface SubCommand {
	schema: string;
	search: (client: Falcon, message: Message) => object;
	key: string;
	description: string;
	validate: (
		client: Falcon,
		message: Message,
		args: string[]
	) => ValidationResponse;
	parseToDB: (client: Falcon, message: Message, args: string[]) => any;
}
