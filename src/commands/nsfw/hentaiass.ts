import Command from '../../constants/command';
// @ts-ignore
import NSFW from 'discord-nsfw'

const nsfw = new NSFW()

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
        message.channel.send(await nsfw.hentaiass())
    },
}

export default HentaiAssCommand;