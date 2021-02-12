const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Displays the bot latency.",
    usage: "ping",
    aliases: ["latency"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    message.channel.send("Loading data! :thinking:").then(async (msg) => {
        const pingEmbed = new Discord.MessageEmbed()
            .setTitle("Ping")
            .setAuthor(`Requested by ${message.author.tag}`)
            .setDescription(
                `🏓 Pong! Your Latency is ${
                    msg.createdTimestamp - message.createdTimestamp
                }ms and API Latency is ${Math.round(bot.ws.ping)} ms!`
            );

        message.channel.send(pingEmbed);
    });
};
