import Command from '../../constants/command';
// @ts-ignore
import nsfw from 'discord-nsfw'

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