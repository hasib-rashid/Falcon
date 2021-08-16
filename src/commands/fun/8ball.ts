import { RunFunction } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js'

export const name = '8ball'
export const category = 'fun'
export const description = 'Test your luck with 8ball'

const json = [
    "As I see it, yes",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don’t count on it.",
    "It is certain.",
    "It is decidedly so",
    "Most Likely",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Outlook good",
    "Reply hazy, try again",
    "Signs point to yes",
    "Very doubtful",
    "Without a doubt",
    "Yes",
    "Yes - definitely",
    "You may rely on it"
]

export const run: RunFunction = async (client, message, args) => {
    const randomIndex = Math.floor(Math.random() * json.length);

    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle("8ball")
        .addField(":grey_question:", args.join(" "))
        // @ts-ignore
        .addField(":8ball:", json[randomIndex])
        .setColor("BLUE");

    message.channel.send(embed);
}