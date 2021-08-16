import { RunFunction } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js'
import { default as axios } from 'axios'

export const name = 'binary'
export const category = 'general'
export const description = 'Convert text to binary'

export const run: RunFunction = async (client, message, args) => {
    if (!args.join(" "))
    return message.channel.send(
        "**Please send a Text Message to convert it to binary**"
    );

    try {
        axios.get(`http://some-random-api.ml/binary?text=${args.join(" ")}`).then(function (response) {
            const embed = new MessageEmbed()
                .setTitle("Binary")
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setColor("#118eed")
                .setDescription(response.data.binary);

            message.channel.send(embed);
        });
    } catch (err) {
        message.channel.send(
            "**An unexpected Error occured. Please put the Correct Syntax.**"
        );
    }
}