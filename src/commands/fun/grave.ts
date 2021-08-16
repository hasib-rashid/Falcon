import { RunFunction } from '../../interfaces/Command';
import { default as axios } from 'axios'

export const name = 'grave'
export const category = 'fun'
export const description = 'Grave yourself or other member'

export const run: RunFunction = async (client, message, args) => {
    const user = message.mentions.users.first()?.displayAvatarURL() || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL() || message.author.displayAvatarURL()

    message.channel.send(`https://vacefron.nl/api/grave?user=${user}`)
}