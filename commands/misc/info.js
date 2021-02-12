const Discord = require("discord.js");

module.exports = {
    name: "info",
    description: "Displays the Information of the Bot",
    usage: "info",
    aliases: ["information"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    const info_embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(
            "Thanks for using CodeVert! This bot is to make your life simple and fun! Enjoy the many features CodeVert has to offer like Moderating, Music, Games, Events, and more!"
        );

    message.channel.send(info_embed);
};
