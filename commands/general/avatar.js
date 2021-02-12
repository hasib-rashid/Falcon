const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Searches the Avatar of the you want!",
    usage: "!avatar <user>",
    aliases: ["av", "ava"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    const member = message.mentions.members.first();
    if (!member) {
        const avatar_embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**Avatar**`)
            .setTitle(`${message.author.username}'s Avatar`)
            .setImage(message.author.avatarURL({ dynamic: true, size: 256 }));
        message.channel.send(avatar_embed);
    }

    if (member) {
        const other_avatar_embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`**Avatar**`)
            .setTitle(`${member.user.tag}'s Avatar`)
            .setImage(member.user.avatarURL({ dynamic: true, size: 256 }));
        message.channel.send(other_avatar_embed);
    }
};
