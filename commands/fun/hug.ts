import Command from '../../constants/command';
import { default as axios } from 'axios'
import { MessageEmbed } from 'discord.js'

const HugCommand: Command = {
    name: 'hug',
    description: 'Hug someone!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {

    },
}

export default HugCommand;