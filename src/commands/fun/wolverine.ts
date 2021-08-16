import { RunFunction } from '../../interfaces/Command';

export const name = 'wolverine'
export const category = 'fun'
export const description = 'Wolverine'

export const run: RunFunction = async (client, message, args) => {
    const user = message.mentions.users.first()?.displayAvatarURL() || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL() || message.author.displayAvatarURL()

    message.channel.send(`https://vacefron.nl/api/wolverine?user=${user}`)
}