import { Message } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
export const run: RunFunction = async (client, message: Message) => {
	if (message.partial) await message.fetch();
};
export const name: string = 'messageDelete';
