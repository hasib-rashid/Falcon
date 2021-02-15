const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

/**
 *  @param {Discord.Message} message
 *  @param {Discord.Client} client
 */

module.exports = class PingCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ping",
            aliases: [],
            group: "general",
            memberName: "ping",
            description: "Ping Pong command for checking your latency",
            details: oneLine`
                Ping Pong command for checking your latency
            `,
            examples: ["!ping"],
        });
    }

    async run(message) {
        message.channel.send("Pong");
    }
};
