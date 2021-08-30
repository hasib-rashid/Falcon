import { RunFunction } from '../../interfaces/Command';
import { default as axios } from 'axios'
import { MessageEmbed } from 'discord.js';

export const name = 'puppy'
export const category = 'fun'
export const description = 'Watch an image of a Puppy'

export const run: RunFunction = async (client, message, args) => {
    axios.get("https://dog.ceo/api/breeds/image/random").then((response) => {
        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle("Puppy!")
            .setDescription("Here's your random puppy!")
            .setColor("BLUE")
            .setImage(response.data.message);

        message.channel.send({ embeds: [embed] });
    }).catch((err) => {
        client.logger.error(err)
    })
}