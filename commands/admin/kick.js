const Discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kicks the Member",
    usage: "!kick <member>",
    aliases: [],
    permissions: ["KICK_MEMBERS"],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.channel.send(":no_entry: Insufficient permissions");
    const member = message.mentions.members.first();
    if (!member) return message.channel.send(":no_entry: No user mentioned.");
    const reason = args.slice(1).join(" ");
    if (!member.kickable)
        return message.channel.send(":no_entry: I cannot kick this user.");
    if (member) {
        if (!reason) {
            return member.kick().then((member) => {
                const kicked_embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Kicked Succesfully!")
                    .setAuthor(`Kicked by ${message.author.username}`)
                    .setDescription(
                        `${member.user.tag} was kicked by ${message.author}, no reason was provided.`
                    );
                message.channel.send(kicked_embed);
            });
        }
        if (reason) {
            member.kick().then((member) => {
                const banned_embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("Kicked Succesfully!")
                    .setAuthor(`Kicked by ${message.author.username}`)
                    .setDescription(
                        `${member.user.tag} was kicked by ${message.author} for ${reason}.`
                    );
                message.channel.send(banned_embed);
            });
        }
    }
};
