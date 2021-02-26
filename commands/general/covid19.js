const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");
const { formatNumber } = require("../../util/Util");

module.exports = class Covid19Command extends commando.Command {
    constructor(client) {
        super(client, {
            name: "covid19",
            aliases: ["covid"],
            group: "search",
            memberName: "covid19",
            description: "Search for Covid 19 Info",
            details: oneLine`
                Search for Covid 19 Info
            `,
            examples: ["!covid19 <country>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        const args = message.content.split(" ").slice(1);
        const { body } = await request.get(
            "https://corona.lmao.ninja/v2/all?yesterday"
        );

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle("Covid 19 Information")
            .setDescription(
                "View all the latest Covid 19 news in CodeVert. The situation of Covid is on the way."
            )
            .addFields(
                {
                    name: "❯ Total Cases",
                    value: formatNumber(body.cases),
                    inline: true,
                },
                {
                    name: "❯ Total Deaths",
                    value: formatNumber(body.deaths),
                    inline: true,
                },
                {
                    name: "❯ Total Recovery",
                    value: formatNumber(body.recovered),
                    inline: true,
                },
                {
                    name: "❯ Cases Today",
                    value: formatNumber(body.todayCases),
                    inline: true,
                },
                {
                    name: "❯ Deaths Today",
                    value: formatNumber(body.todayDeaths),
                    inline: true,
                },
                {
                    name: "❯ Recovery Today",
                    value: formatNumber(body.todayRecovered),
                    inline: true,
                },
                {
                    name: "❯ Active Cases",
                    value: formatNumber(body.active),
                    inline: true,
                },
                {
                    name: "❯ Critical Cases",
                    value: formatNumber(body.critical),
                    inline: true,
                },
                {
                    name: "❯ Tests Today",
                    value: formatNumber(body.tests),
                    inline: true,
                }
            )
            .setColor("BLUE");

        message.channel.send(embed);
    }
};
