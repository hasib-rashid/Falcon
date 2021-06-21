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
        axios.get(`https://instagram.com/${args[0]}/?__a=1`).then((res) => {
            console.log(res.data)
        })
    },
}

export default InstagramCommand;