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
        message.channel.send("Loading data! :thinking:").then(async (msg) => {
            const pingEmbed = new Discord.MessageEmbed()
                .setTitle("Ping")
                .setAuthor(`Requested by ${message.author.tag}`)
                .setDescription(
                    `🏓 Pong! Your Latency is ${
                        msg.createdTimestamp - message.createdTimestamp
                    }ms and API Latency is ${Math.round(
                        this.client.ws.ping
                    )} ms!`
                );

            if (this.client.ws.ping < "120") pingEmbed.setColor("GREEN");

            if (this.client.ws.ping < "500") pingEmbed.setColor("ORANGE");

            if (this.client.ws.ping > "500") pingEmbed.setColor("RED");

            message.channel.send(pingEmbed);
        });
    }
};
