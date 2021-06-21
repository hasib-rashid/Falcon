import Command from '../../constants/command';
// @ts-ignore
import * as googleIt from 'google-it'

const GoogleCommand: Command = {
    name: 'google',
    description: 'Google anything on Falcon',
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

export default GoogleCommand;