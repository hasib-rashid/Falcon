import Command from '../../constants/command';
// @ts-ignore
import NSFW from 'discord-nsfw'

const nsfw = new NSFW()

const NekoTits: Command = {
    name: 'nekotits',
    description: 'NSFW nekotits',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: true,
    cooldown: 0,

    async run(client, message, args) {
        message.channel.send(await nsfw.nekotits())
    },
}

export default NekoTits;