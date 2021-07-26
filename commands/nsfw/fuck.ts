import Command from '../../constants/command';
// @ts-ignore
import nsfw from 'discord-nsfw'

const FuckCommand: Command = {
    name: 'fuck',
    description: 'NSFW fuck',
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

export default FuckCommand;