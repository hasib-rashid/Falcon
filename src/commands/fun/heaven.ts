import { RunFunction } from '../../interfaces/Command';
import { default as axios } from 'axios'

export const name = 'heaven'
export const category = 'fun'
export const description = 'Heaven yourself ;)'

export const run: RunFunction = async (client, message, args) => {
    const user = message.mentions.users.first()?.displayAvatarURL() || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL() || message.author.displayAvatarURL()

    message.channel.send(`https://vacefron.nl/api/heaven?user=${user}`)
}