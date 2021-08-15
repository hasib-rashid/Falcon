import { RunFunction } from '../../interfaces/Command';

import NSFW from 'discord-nsfw'
const nsfw = new NSFW();

export const name = 'erokemo'
export const category = 'nsfw'
export const description = 'NSFW Erokemo'

export const run: RunFunction = async (client, message, args) => {
    message.channel.send(await nsfw.erokemo())
}