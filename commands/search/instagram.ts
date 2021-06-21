import Command from '../../constants/command';
import { default as axios } from 'axios'
import { MessageEmbed } from 'discord.js'

const InstagramCommand: Command = {
    name: 'instagram',
    description: 'Look at the ig of someone in Instagram',
    aliases: [
        'ig'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {

    },
}

export default InstagramCommand;