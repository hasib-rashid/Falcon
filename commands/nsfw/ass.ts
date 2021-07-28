import Command from '../../constants/command';
// @ts-ignore
import NSFW from 'discord-nsfw'

const AssCommand: Command = {
    name: 'ass',
    description: 'NSFW Ass',
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

export default AssCommand;