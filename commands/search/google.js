require("dotenv").config();

const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");
const axios = require("request");

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
        try {
            const options = {
                url: "https://api.goog.io/v1/search/q=united+states",
                qs: "57362ccb-18bc-47a6-b9a2-11cb5bbc3daf",
                apikey: "57362ccb-18bc-47a6-b9a2-11cb5bbc3daf",
                json: true,
            };

            await new request(options, (error, response, body) => {
                if (error) throw new Error(error);

                console.log(response);
                console.log(body);
                console.log("triggered");
            });
        } catch (err) {
            console.error(err);
        }
    }
};
