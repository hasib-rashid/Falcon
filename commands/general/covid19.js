const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");

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

        if (!args) {
            const { body } = await request.get(
                "https://corona.lmao.ninja/v2/all?yesterday"
            );
        }
    }
};
