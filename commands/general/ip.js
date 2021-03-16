const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");
const axios = require("axios").default;

module.exports = class IPCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ip",
            aliases: [],
            group: "moderation",
            memberName: "ip",
            description: "Find Details about a IP or a website",
            details: oneLine`
                Find Details about a IP or a website
            `,
            examples: ["!ip <website> or !ip <any_ip_adress>"],
            credit: [
                {
                    name: "IP-API",
                    url: "ip-api.com",
                    reason: "API",
                },
            ],
            args: [
                {
                    key: "query",
                    prompt: "What Ip or Website do you want to search?",
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
            const { body } = await request.get(
                `http://ip-api.com/json/${query}`
            );

            if (body.country == null) {
                const embed = new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle(
                        ":no_entry: An Unexpected Error Occurred. Result couldnt be found."
                    );

                message.channel.send(embed);
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle(query)
                    .addField("❯ IP", body.query, true)
                    .addField("❯ Country", body.country || "None", true)
                    .addField("❯ Region", body.regionName || "None", true)
                    .addField(
                        "❯ City",
                        body.city || body.region || "None",
                        true
                    )
                    .addField("❯ Zip Code", body.zip || "None", true)
                    .addField("❯ Timezone", body.timezone || "None", true)
                    .addField("❯ ISP", body.isp || "None", true)
                    .addField("❯ Organization", body.org || "None", true)
                    .addField("❯ Proxy", "Yes", true);
                message.channel.send(embed);
            }
        } catch (err) {
            if (err.status === "fail")
                return message.channel.send(
                    ":no_entry: Could not find any results."
                );
            console.error(err);
        }
    }
};
