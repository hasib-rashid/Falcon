import Command from '../../constants/command';
import { default as axios } from 'axios';

const DiscordJSCommand: Command = {
    name: 'djs',
    description: 'Search the Djs docs here',
    aliases: [
        'discord.js', 'discordjs'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {

    },
}

export default DiscordJSCommand;