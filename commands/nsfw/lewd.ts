import Command from '../../constants/command';
// @ts-ignore
import NSFW from 'discord-nsfw'

const nsfw = new NSFW()

const LewdCommand: Command = {
    name: 'lewd',
    description: 'NSFW lewd',
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

export default LewdCommand;