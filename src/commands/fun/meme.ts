import Command from '../../typings/command';
import { MessageEmbed } from 'discord.js'
import { default as axios } from 'axios'

const MemeCommand: Command = {
    name: 'meme',
    description: 'Memes! IKR',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
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
        });
    },
}

export default MemeCommand;