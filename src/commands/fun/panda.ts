import Command from '../../constants/command';
import { default as axios } from 'axios'

const PandaCommand: Command = {
    name: 'panda',
    description: 'Watch panda here?',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get("https://some-random-api.ml/img/panda").then((res) => {
            message.channel.send(res.data.link)
        })
    },
}

export default PandaCommand;