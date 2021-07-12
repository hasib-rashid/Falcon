import Command from '../../constants/command';
import { default as axios } from 'axios'

const TenorCommand: Command = {
    name: 'tenor',
    description: 'Search GIF of Tenor from Falcon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get("https://g.tenor.com/v1/search?q=excited&key=LIVDSRZULELA&limit=8").then((res) => {
            message.channel.send(res.data.results[Math.floor(Math.random() * res.data.results.length)].itemurl)
        })
    },
}

export default TenorCommand;