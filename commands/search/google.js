require("dotenv").config();

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const axios = require("axios").default;
const serp = require("serp")

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

    async run(message) {
        try {
            const args = message.content.split(" ").slice(1);

            const configuration = {
                host: "google.com",
                qs: {
                    q: args.join(" "),
                },
                num: 100
            };
            const links = await serp.search(configuration);

            const embed = new Discord.MessageEmbed()
                .setAuthor(
                    "Google",
                    "https://expresswriters.com/wp-content/uploads/2015/09/google-new-logo-450x450.jpg"
                )
                .setColor("#1183ed");

            for (var i = 0; i < links.length; ++i) {
                const response = links[i]
                embed.addField(
                    response.title, `[Link](${response.url})`
                );
            }
            message.channel.send(embed)
            console.log(links)
        } catch (err) {
            console.error(err);
        }
    }
};
