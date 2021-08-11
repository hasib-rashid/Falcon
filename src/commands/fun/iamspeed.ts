import Command from '../../constants/command';
import { default as axios } from 'axios'

const IAmSpeedCommand: Command = {
    name: 'iamspeed',
    description: 'Speeeed',
    aliases: [
        'i-am-speed'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const user = message.mentions.users.first()?.displayAvatarURL() || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL() || message.author.displayAvatarURL()

        message.channel.send(`https://vacefron.nl/api/iamspeed?user=${user}`)
    },
}

export default IAmSpeedCommand;