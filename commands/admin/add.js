const Discord = require("discord.js");

module.exports = {
    name: "add",
    description: "add the Member",
    usage: "!add <member>",
    aliases: [],
    permissions: ["MANAGE_ROLES"],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    if (message.member.hasPermission("MANAGE_EMOJIS")) {
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
        memberUser.roles.add(role);

        const addRoleEmbed = new Discord.MessageEmbed()
            .setTitle("Role Added! :thumbsup:")
            .setColor("RANDOM")
            .setDescription(
                `:thumbsup: ${role} was Successfully added to ${targetUser} by ${message.author.tag}`
            )
            .setFooter("Copyright @2021 CodeVert");

        message.channel.send(addRoleEmbed);
    } else {
        message.channel.send(":no_entry: Insufficient Permissions");
    }
};
