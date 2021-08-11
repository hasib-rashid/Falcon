import Command from '../../typings/command';
// @ts-ignore
import NSFW from 'discord-nsfw'

const nsfw = new NSFW()

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
        message.channel.send(await nsfw.pgif())
    },
}

export default PGIFCommand;