import { RunFunction } from '../../interfaces/Command';

export const name = 'eject'
export const category = 'fun'
export const description = 'Eject someone from discord like amogus'

export const run: RunFunction = async (client, message, args) => {
    const colors = [
        "black",
        "blue",
        "brown",
        "cyan",
        "darkgreen",
        "lime",
        "orange",
        "pink",
        "purple",
        "red",
        "white",
        "yellow"
    ]

    const impostor = [true, false, false, false]

    const random_color = colors[Math.floor(Math.random() * colors.length)];
    const random_impostor = impostor[Math.floor(Math.random() * impostor.length)];

    const user = message.mentions.members?.first()?.user.username || message.guild?.members.cache.get(args[0])?.user.username || message.author.username

    message.channel.send(`https://vacefron.nl/api/ejected?name=${user}&impostor=${random_impostor}&crewmate=${random_color}`)
}