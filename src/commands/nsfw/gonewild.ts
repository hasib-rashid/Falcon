import { RunFunction } from '../../interfaces/Command';

import NSFW from 'discord-nsfw'
const nsfw = new NSFW();

export const name = 'gonewild'
export const category = 'nsfw'
export const description = 'NSFW Gonewild'

export const run: RunFunction = async (client, message, args) => {
    message.channel.send(await nsfw.gonewild())
}