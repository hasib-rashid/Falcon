const Discord = require("discord.js");

module.exports = {
    name: "uptime",
    description: "Finds the Invite link for the server",
    usage: "!invite",
    aliases: ["upt"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    let totalSeconds = bot.uptime / 1000;
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds / 60;
    message.channel.send(
        `:low_brightness: **Uptime:** ${days} days, ${hours} hours and ${minutes} minutes!`
    );
};
