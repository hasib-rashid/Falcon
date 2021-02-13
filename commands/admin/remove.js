const Discord = require("discord.js");

module.exports = {
    name: "remove",
    description: "Remove a role from the Member",
    usage: "!add <member> <role_name>",
    aliases: [],
    permissions: ["MANAGE_ROLES"],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    if (message.member.hasPermission("MANAGE_ROLES")) {
        const targetUser = message.mentions.users.first();

        if (!targetUser) {
            message.channel.send(":no_entry: Please specify a user first!");
            return;
        }

        args.shift();

        const roleName = args.join(" ");
        const { guild } = message;

        const role = guild.roles.cache.find((role) => {
            return role.name === roleName;
        });

        if (!role) {
            message.channel.send(
                `:no_entry: There is no role named as "${roleName}"`
            );
            return;
        }

        const memberUser = guild.members.cache.get(targetUser.id);
        memberUser.roles.remove(role);

        const removeRoleEmbed = new Discord.MessageEmbed()
            .setTitle("Role Removed! :thumbsup:")
            .setColor("RANDOM")
            .setDescription(
                `:thumbsup: ${role} was Successfully removed to ${targetUser} by ${message.author.tag}`
            )
            .setFooter("Copyright @2021 CodeVert");

        message.channel.send(removeRoleEmbed);
    } else {
        message.channel.send(":no_entry: Insufficient Permissions");
    }
};
