import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'
import { default as axios } from 'axios'

const DecodeCommand: Command = {
    name: 'decode',
    description: 'Use this command to decode binary',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
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

                message.channel.send(embed);
            });
        } catch (e) {
            return message.channel.send(
                `**An error occured, please try again and put binary codes this time.**`
            );
        }
    },
}

export default DecodeCommand;