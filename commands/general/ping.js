const Discord = require("discord.js");
const bot = new Discord.Client();

module.exports = {
    id: "ping",
    aliases: ["ping"],
    channels: "any",
    exec: (client) => {
        client.message.channel
            .send("Loading data! :thinking:")
            .then(async (msg) => {
                const pingEmbed = new Discord.MessageEmbed()
                    .setTitle("Ping")
                    .setAuthor(`Requested by ${client.message.author.tag}`)
                    .setDescription(
                        `🏓 Pong! Your Latency is ${
                            msg.createdTimestamp -
                            client.message.createdTimestamp
                        }ms and API Latency is ${Math.round(
                            client.client.ws.ping
                        )} ms!`
                    )
                    .setFooter("Copyright @2021 CodeVert");

                client.message.channel.send(pingEmbed);
            });
    },
};
