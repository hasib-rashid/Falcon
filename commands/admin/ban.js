const Discord = require("discord.js");

module.exports = {
    name: "ban",
    description: "Bans the Member",
    usage: "!ban <member>",
    aliases: [],
    permissions: ["BAN_MEMBERS"],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.channel.send(":no_entry: Insufficient permissions");
    const member = message.mentions.members.first();
    if (!member) return message.channel.send(":no_entry: No user mentioned.");
    const reason = args.slice(1).join(" ");
    if (!member.kickable)
        return message.channel.send(":no_entry: I cannot ban this user.");
    if (member) {
        if (!reason) {
            return member.ban().then((member) => {
                const kicked_embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Banned Succesfully!")
                    .setAuthor(`Banned by ${message.author.username}`)
                    .setDescription(
                        `${member.user.tag} was banned by ${message.author}, no reason was provided.`
                    );
                message.channel.send(kicked_embed);
            });
        }
        if (reason) {
            member.ban().then((member) => {
                const banned_embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Banned Succesfully!")
                    .setAuthor(`Banned by ${message.author.username}`)
                    .setDescription(
                        `${member.user.tag} was banned by ${message.author} for ${reason}.`
                    );
                message.channel.send(banned_embed);
            });
        }
    }
};
