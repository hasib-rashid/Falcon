import { RunFunction } from '../../interfaces/Command';
import { default as axios } from 'axios'

export const name = 'drip'
export const category = 'fun'
export const description = 'Drip Ikr'

export const run: RunFunction = async (client, message, args) => {
    const user = message.mentions.users.first()?.displayAvatarURL() || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL() || message.author.displayAvatarURL()

    message.channel.send(`https://vacefron.nl/api/drip?user=${user}`)
}