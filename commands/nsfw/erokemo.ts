import Command from '../../constants/command';
// @ts-ignore
import NSFW from 'discord-nsfw'

const ErokemoCommand: Command = {
    name: 'erokemon',
    description: 'NSFW erokemon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: true,
    cooldown: 0,

    async run(client, message, args) {

    },
}

export default ErokemoCommand;