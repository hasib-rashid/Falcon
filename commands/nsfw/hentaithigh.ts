import Command from '../../constants/command';
// @ts-ignore
import NSFW from 'discord-nsfw'

const nsfw = new NSFW()

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
        message.channel.send(await nsfw.hentaithigh())
    },
}

export default HentaiThighCommand;