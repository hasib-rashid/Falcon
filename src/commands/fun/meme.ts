import { RunFunction } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js'
import { default as axios } from 'axios'

export const name = 'meme'
export const category = 'fun'
export const description = 'Watch a Meme'

export const run: RunFunction = async (client, message, args) => {
    axios.get("https://some-random-api.ml/meme").then((response) => {
        const embed = new MessageEmbed()
            .setAuthor(
                message.author.username,
                message.author.displayAvatarURL()
            )
            .setTitle("Memes")
            .setDescription(response.data.caption)
            .setColor("BLUE")
            .setImage(response.data.image);

        message.channel.send(embed);
    })
}