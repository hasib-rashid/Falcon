require("dotenv").config();

const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");

module.exports = class GiphyCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "giphy",
            aliases: [],
            group: "search",
            memberName: "giphy",
            description: "Search a GIF from Giphy.com",
            details: oneLine`
                Search a GIF from Giphy.com
            `,
            examples: ["!giphy <gif_name>"],
            credit: [
                {
                    name: "GIPHY",
                    url: "https://giphy.com/",
                    reason: "API",
                    reasonURL: "https://developers.giphy.com/",
                },
            ],
            args: [
                {
                    key: "query",
                    prompt: "What GIF would you like to search for?",
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
                .get("http://api.giphy.com/v1/gifs/search")
                .query({
                    q: query,
                    api_key: process.env.GIPHY_API_KEY,
                    rating: message.channel.nsfw ? "r" : "pg",
                });
            if (!body.data.length)
                return message.say("Could not find any results.");
            return message.say(
                body.data[Math.floor(Math.random() * body.data.length)].images
                    .original.url
            );
        } catch (err) {
            console.error(err);
        }
    }
};
