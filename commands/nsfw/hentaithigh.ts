import Command from '../../constants/command';
// @ts-ignore
import nsfw from 'discord-nsfw'

const HentaiThighCommand: Command = {
    name: 'hentaithigh',
    description: 'NSFW hentaithigh',
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

export default HentaiThighCommand;