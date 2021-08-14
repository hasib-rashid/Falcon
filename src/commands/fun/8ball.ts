import { RunFunction } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js'
import * as json from "../../assets/JSON/8ball.json"

export const name = '8ball'
export const category = 'fun'
export const description = 'Test your luck with 8ball'

export const run: RunFunction = async (client, message, args) => {
    // @ts-ignore
    const randomIndex = Math.floor(Math.random() * json.default[0].length);

    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle("8ball")
        .addField(":grey_question:", args.join(" "))
        // @ts-ignore
        .addField(":8ball:", json.default[randomIndex])
        .setColor("BLUE");

    message.channel.send(embed);
}