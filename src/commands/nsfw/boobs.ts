import { RunFunction } from '../../interfaces/Command';

import NSFW from 'discord-nsfw'
const nsfw = new NSFW();

export const name = 'boobs'
export const category = 'nsfw'
export const description = 'NSFW Boobs'

export const run: RunFunction = async (client, message, args) => {
    message.channel.send(await nsfw.boobs())
}