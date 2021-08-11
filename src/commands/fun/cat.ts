import Command from '../../typings/command';
import consola from 'consola'
import { MessageEmbed } from 'discord.js'
import { default as axios } from 'axios'

const CatCommand: Command = {
    name: 'cat',
    description: 'Watch any cat here!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            axios.get("https://api.thecatapi.com/v1/images/search").then(({ data }) => {
                const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTitle("Cat!")
                    .setDescription("Here's your random cat!")
                    .setColor("BLUE")
                    .setImage(data[0].url)

                message.channel.send(embed);
            })

        } catch (err) {
            message.channel.send("**An unexpected error occured. Please try again**")
        }
    },
}

export default CatCommand;