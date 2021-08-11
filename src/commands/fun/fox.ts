import Command from '../../typings/command';
import { default as axios } from 'axios'

const FoxCommand: Command = {
    name: 'fox',
    description: 'Watch some foxes!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get("https://some-random-api.ml/img/fox").then((res) => {
            message.channel.send(res.data.link)
        })
    },
}

export default FoxCommand;