import Command from '../../constants/command';
import { default as axios } from 'axios'

const StonksCommand: Command = {
    name: 'stonks',
    description: 'Get some Stonks',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get(`https://vacefron.nl/api/stonks?user=http${message.author.displayAvatarURL()}`).then((res) => {
            console.log(res.data)
        })
    },
}

export default StonksCommand;