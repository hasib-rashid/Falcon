require("dotenv").config();

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");
const { shorten, formatNumber } = require("../../util/Util");

module.exports = class BookCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "book",
            aliases: [],
            group: "search",
            memberName: "book",
            description: "Find about any book here",
            details: oneLine`
                Find about any book here
            `,
            examples: ["!book <name>"],
            credit: [
                {
                    name: "Google",
                    url: "https://www.google.com/",
                    reason: "Books API",
                    reasonURL: "https://developers.google.com/books/",
                },
            ],
            args: [
                {
                    key: "query",
                    prompt: "What book would you like to search for?",
                    type: "string",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { query }) {
        try {
            const { body } = await request
                .get("https://www.googleapis.com/books/v1/volumes")
                .query({
                    apiKey: process.env.GOOGLE_API,
                    q: query,
                    maxResults: 1,
                    printType: "books",
                });
            if (!body.items) return message.say("Could not find any results.");
            const data = body.items[0].volumeInfo;
            const embed = new Discord.MessageEmbed()
                .setColor(0x4285f4)
                .setTitle(data.title)
                .setURL(data.previewLink)
                .setAuthor(
                    "Google Books",
                    "https://i.imgur.com/N3oHABo.png",
                    "https://books.google.com/"
                )
                .setDescription(
                    data.description
                        ? shorten(data.description)
                        : "No description available."
                )
                .setThumbnail(
                    data.imageLinks ? data.imageLinks.thumbnail : null
                )
                .addField(
                    "❯ Authors",
                    data.authors.length ? data.authors.join(", ") : "???"
                )
                .addField("❯ Publish Date", data.publishedDate || "???", true)
                .addField(
                    "❯ Page Count",
                    data.pageCount ? formatNumber(data.pageCount) : "???",
                    true
                );
            return message.embed(embed);
        } catch (err) {
            console.error(err);
        }
    }
};
