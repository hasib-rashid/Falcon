import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { default as axios } from 'axios'
import { formatNumber, shorten } from '../../util/functions';

export const name = 'book'
export const category = 'search'
export const description = 'Search a Book'

export const run: RunFunction = async (client, message, args) => {
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
            .setDescription(
                data.description
                    ? shorten(data.description)
                    : "No description available."
            )
            .setThumbnail(
                data.imageLinks ? data.imageLinks.thumbnail : null
            )
            .addField("❯ Publisher", data.publisher)
            .addField("❯ Publish Date", data.publishedDate || "???", true)
            .addField(
                "❯ Page Count",
                data.pageCount ? formatNumber(data.pageCount) : "???",
                true
            );

        if (data.authors) {
            embed.addField(
                "❯ Authors",
                data.authors.length ? data.authors.join(", ") : "???"
            );
        }

        message.channel.send({ embeds: [embed] })
    })
}