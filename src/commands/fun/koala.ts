import Command from '../../typings/command';
import { default as axios } from 'axios'

const KoalaCommand: Command = {
    name: 'koala',
    description: 'Watch some koala!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get("https://some-random-api.ml/img/koala").then((res) => {
            message.channel.send(res.data.link)
        })
    },
}

export default KoalaCommand;