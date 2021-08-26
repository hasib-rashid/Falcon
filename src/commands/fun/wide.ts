import { RunFunction } from '../../interfaces/Command';

export const name = 'wide'
export const category = 'fun'
export const description = 'Widen your avatar'

export const run: RunFunction = async (client, message, args) => {
    const user = message.mentions.users.first()?.displayAvatarURL() || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL() || message.author.displayAvatarURL()

    message.channel.send(`https://vacefron.nl/api/tableflip?user=${user}`)
}