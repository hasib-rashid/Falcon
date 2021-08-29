import { MessageEmbed } from 'discord.js';
import { default as axios } from 'axios';
import { RunFunction } from '../../interfaces/Command';

export const name = 'decode'
export const category = 'general'
export const description = 'Decode a encoded Binary'

export const run: RunFunction = async (client, message, args) => {
    if (!args.join(" "))
        return message.channel.send(
            "**Please send a Binary Code to Decode**"
        );

    try {
        axios.get(`http://some-random-api.ml/binary?decode=${args.join(" ")}`).then(function (response) {
            const embed = new MessageEmbed()
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setTitle("Decoding Binary")
                .setColor("#118eed")
                .setDescription(response.data.text);

            message.channel.send({ embeds: [embed] });
        });
    } catch (e) {
        return message.channel.send(
            `**An error occured, please try again and put binary codes this time.**`
        );
    }
}