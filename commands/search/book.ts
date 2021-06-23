import Command from '../../constants/command';
import { default as axios } from 'axios'
import { MessageEmbed } from 'discord.js'

const BookCommand: Command = {
    name: 'book',
    description: 'Find any books at this spot!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get("https://www.googleapis.com/books/v1/volumes", {
            params: {
                apiKey: process.env.GOOGLE_API,
                q: args.join(" "),
                maxResults: 1,
                printType: "books",
            }
        }).then((res) => {
            if (!res.data.items) return message.channel.send("**Could not find any results.**");

            const data = res.data.items[0].volumeInfo;

            const embed = new MessageEmbed()
                .setAuthor(
                    "Google Books",
                    "https://i.imgur.com/N3oHABo.png",
                    "https://books.google.com/"
                )
                .setColor("#337ef5")
                .setTitle(data.title)

            message.channel.send(embed)
        })
    },
}

export default BookCommand;