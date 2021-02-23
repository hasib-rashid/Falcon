const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");
const { shorten, formatNumber } = require("../../util/Util");

module.exports = class UrbanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "urban",
            aliases: [],
            group: "search",
            memberName: "urban",
            description: "Search any words from the dictionary easily",
            details: oneLine`
                Search any words from the dictionary easily
            `,
            examples: ["!urban <word>"],
            credit: [
                {
                    name: "Urban Dictionary",
                    url: "https://www.urbandictionary.com/",
                    reason: "API",
                    reasonURL:
                        "https://github.com/zdict/zdict/wiki/Urban-dictionary-API-documentation",
                },
            ],
            args: [
                {
                    key: "word",
                    prompt: "What word would you like to look up?",
                    type: "string",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { word }) {
        try {
            const { body } = await request
                .get("http://api.urbandictionary.com/v0/define")
                .query({ term: word });
            if (!body.list.length)
                return message.say("Could not find any results.");
            const data = body.list[0];
            const embed = new Discord.MessageEmbed()
                .setColor(0x32a8f0)
                .setAuthor(
                    "Urban Dictionary",
                    "https://i.imgur.com/Fo0nRTe.png",
                    "https://www.urbandictionary.com/"
                )
                .setURL(data.permalink)
                .setTitle(data.word)
                .setDescription(shorten(data.definition.replace(/\[|\]/g, "")))
                .setFooter(
                    `👍 ${formatNumber(data.thumbs_up)} 👎 ${formatNumber(
                        data.thumbs_down
                    )}`
                )
                .setTimestamp(new Date(data.written_on))
                .addField(
                    "❯ Example",
                    data.example
                        ? shorten(data.example.replace(/\[|\]/g, ""), 1000)
                        : "None"
                );
            return message.embed(embed);
        } catch (err) {
            console.error(err);
        }
    }
};
