require("dotenv").config();

const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");

module.exports = class GoogleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "google",
            aliases: [],
            group: "search",
            memberName: "google",
            description: "Google something here!",
            details: oneLine`
                Google something here!
            `,
            examples: ["!google <query>"],
            credit: [
                {
                    name: "Google",
                    url: "https://www.google.com/",
                    reason: "Custom Search API",
                    reasonURL: "https://cse.google.com/cse/all",
                },
                {
                    name: "LMGTFY",
                    url: "https://lmgtfy.com/",
                    reason: "API",
                },
            ],
            args: [
                {
                    key: "query",
                    prompt: "What would you like to search for?",
                    type: "string",
                    validate: (query) => {
                        if (encodeURIComponent(query).length < 1950)
                            return true;
                        return "Invalid query, your query is too long.";
                    },
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { query }) {
        let href;
        const nsfw = message.channel.nsfw || false;
        try {
            href = await this.customSearch(query, nsfw);
        } catch {
            href = `http://lmgtfy.com/?iie=1&q=${encodeURIComponent(query)}`;
        }
        if (!href) return message.say("Could not find any results.");
        return message.say(href);
    }

    async customSearch(query, nsfw) {
        const { body } = await request
            .get("https://www.googleapis.com/customsearch/v1")
            .query({
                key: process.env.GOOGLE_API,
                cx: process.env.GOOGLE_CX,
                safe: nsfw ? "off" : "active",
                q: query,
            });
        if (!body.items) return null;
        return body.items[0].formattedUrl;
    }
};
