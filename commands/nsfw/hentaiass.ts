import Command from '../../constants/command';
// @ts-ignore
import nsfw from 'discord-nsfw'

const HentaiAssCommand: Command = {
    name: 'hentaiass',
    description: 'NSFW hentaiass',
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

export default HentaiAssCommand;