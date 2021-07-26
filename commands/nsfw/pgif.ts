import Command from '../../constants/command';
// @ts-ignore
import nsfw from 'discord-nsfw'

const PGIFCommand: Command = {
    name: 'pgif',
    description: 'NSFW pgif',
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

export default PGIFCommand;