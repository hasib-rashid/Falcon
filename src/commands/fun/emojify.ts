import { RunFunction } from '../../interfaces/Command';

export const name = 'emojify'
export const category = 'games'
export const description = 'Emojify a text'

export const run: RunFunction = async (client, message, args) => {
    if (!args.join(" ")) return message.channel.send("**Please provide a text**")
    const { Emojify } = require('discord-gamecord');

    message.channel.send(await Emojify(args.join(" ")));
}