require("dotenv").config();

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const googleIt = require('google-it')
const { googleShorten } = require("../../util/Util")

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
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        try {
            const args = message.content.split(" ").slice(1);

            message.channel.send("🤔 Retrieving Results.....").then((msg) => {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Google")
                    .setAuthor(
                        "Google",
                        "https://expresswriters.com/wp-content/uploads/2015/09/google-new-logo-450x450.jpg"
                    )
                    .setColor("#1183ed")

                googleIt({ 'query': args.join(" ") }).then(results => {

                    for (var i = 0; i < results.length; ++i) {
                        var result = results[i];

                        embed.addField(result.title, `[Link](${result.link}) - ${googleShorten(result.snippet)}`)

                    }

                    msg.channel.send(embed)
                }).catch(e => {
                    console.error(e)
                })
            })


        } catch (err) {
            console.error(err);
        }
    }
};
