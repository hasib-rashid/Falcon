import Command from '../../constants/command';
import { default as axios } from 'axios'

const BirdCommand: Command = {
    name: 'bird',
    description: 'Watch some birds!',
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

export default BirdCommand;