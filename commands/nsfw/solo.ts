import Command from '../../constants/command';
// @ts-ignore
import NSFW from 'discord-nsfw'

const SoloCommand: Command = {
    name: 'solo',
    description: 'NSFW solo',
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

export default SoloCommand;