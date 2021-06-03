import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'
import { default as axios } from 'axios'

const IPCommand: Command = {
    name: 'ip',
    description: 'Check the IP of a website or anything here',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get(`http://ip-api.com/json/${args.join(" ")}`).then((response) => {
            console.log(response.data)
        })
    },
}

export default IPCommand;