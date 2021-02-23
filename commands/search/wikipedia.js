const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");
const { shorten } = require("../../util/Util");

module.exports = class WikipediaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "wiki",
            aliases: [],
            group: "search",
            memberName: "wiki",
            description: "Search Wikipedia with this stop",
            details: oneLine`
                Search Wikipedia with this stop
            `,
            examples: ["!wiki <query>"],
            credit: [
                {
                    name: "Wikipedia",
                    url: "https://www.wikipedia.org/",
                    reason: "API",
                    reasonURL: "https://en.wikipedia.org/w/api.php",
                },
            ],
            args: [
                {
                    key: "query",
                    prompt: "What article would you like to search for?",
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
                .get("https://en.wikipedia.org/w/api.php")
                .query({
                    action: "query",
                    prop: "extracts|pageimages",
                    format: "json",
                    titles: query,
                    exintro: "",
                    explaintext: "",
                    pithumbsize: 150,
                    redirects: "",
                    formatversion: 2,
                });
            const data = body.query.pages[0];

            if (data.missing) return message.say("Could not find any results.");
            const embed = new Discord.MessageEmbed()
                .setColor(0xe7e7e7)
                .setTitle(data.title)
                .setAuthor(
                    "Wikipedia",
                    "https://i.imgur.com/Z7NJBK2.png",
                    "https://www.wikipedia.org/"
                )
                .setThumbnail(data.thumbnail ? data.thumbnail.source : null)
                .setURL(
                    `https://en.wikipedia.org/wiki/${query}` ||
                        `https://en.wikipedia.org/404`
                )
                .setDescription(shorten(data.extract));
            return message.embed(embed);
        } catch (err) {
            console.error(err);
        }
    }
};
