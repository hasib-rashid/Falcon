import Command from '../../constants/command';
import { } from 'discord.js-akinator'

const AkiCommand: Command = {
    name: 'aki',
    description: 'description',
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

export default AkiCommand;