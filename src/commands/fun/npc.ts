import { RunFunction } from '../../interfaces/Command';

export const name = 'npc'
export const category = 'fun'
export const description = 'npc'

export const run: RunFunction = async (client, message, args) => {
    const user = message.mentions.users.first()?.displayAvatarURL() || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL() || message.author.displayAvatarURL()

    if (args[0]) return message.channel.send("**Please insert two Text**")
    if (args[1]) return message.channel.send("**Please insert two Text**")

    message.channel.send(`https://vacefron.nl/api/npc?text1=${args[0]}&text2=${args[1]}`)
}