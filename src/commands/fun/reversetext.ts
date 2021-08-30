import { RunFunction } from '../../interfaces/Command';

export const name = 'reversetext'
export const category = 'games'
export const description = 'Reverse a text. Thats it lol'

export const run: RunFunction = async (client, message, args) => {
    if (!args.join(" ")) return message.channel.send("**Please provide a text**")
    const { reverseText } = require('discord-gamecord');

    message.channel.send(await reverseText(args.join(" ")));
}