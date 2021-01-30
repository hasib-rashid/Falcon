const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Ping Pong!",
    category: "general",
    botPermission: [],
    authorPermission: [],
    ownerOnly: false,
    run: async (client, message) => {
        message.channel.send("Loading data! :thinking:").then(async (msg) => {
            const pingEmbed = new Discord.MessageEmbed()
                .setTitle("Ping")
                .setAuthor(`Requested by ${message.author.tag}`)
                .setDescription(
                    `🏓 Pong! Your Latency is ${
                        msg.createdTimestamp - message.createdTimestamp
                    }ms and API Latency is ${Math.round(client.ws.ping)} ms!`
                )
                .setFooter("Copyright @2021 CodeVert");

            message.channel.send(pingEmbed);
        });
    },
};
