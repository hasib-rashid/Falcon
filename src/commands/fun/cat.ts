import { RunFunction } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js'
import { default as axios } from 'axios'

export const name = 'cat'
export const category = 'fun'
export const description = 'Watch the picture of a Cat'

export const run: RunFunction = async (client, message, args) => {
    try {
        axios.get("https://api.thecatapi.com/v1/images/search").then(({ data }) => {
            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle("Cat!")
                .setDescription("Here's your random cat!")
                .setColor("BLUE")
                .setImage(data[0].url)

            message.channel.send({ embeds: [embed] });
        })

    } catch (err) {
        message.channel.send("**An unexpected error occured. Please try again**")
    }
}