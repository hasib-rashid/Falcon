import { RunFunction } from '../../interfaces/Command';

import NSFW from 'discord-nsfw'
import { TextChannel } from 'discord.js';
const nsfw = new NSFW();

export const name = 'anal'
export const category = 'nsfw'
export const description = 'Anal NSFW'

export const run: RunFunction = async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw) return message.channel.send("**You must be in a NSFW Channel to use these commands. 🔞**")
    message.channel.send(await nsfw.anal())
}