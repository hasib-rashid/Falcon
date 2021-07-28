import Command from '../../constants/command';
// @ts-ignore
import NSFW from 'discord-nsfw'

const nsfw = new NSFW()

const NekoFeet: Command = {
    name: 'nekofeet',
    description: 'NSFW nekofeet',
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

export default NekoFeet;