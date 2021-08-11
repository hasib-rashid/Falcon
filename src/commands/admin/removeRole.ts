import { MessageEmbed } from 'discord.js';
import Command from '../../constants/command';

const RemoveRole: Command = {
    name: 'removerole',
    description: 'Remove a Role from a user',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.hasPermission("MANAGE_ROLES"))
            return message.channel.send(
                "**You need `MANAGE_ROLES` permission to use this command**"
            );

        const user = message.mentions.users.first() || message.guild?.members.cache.get(args[0])
        const nameofrole = message.mentions.roles.first()?.name || args[1]

        if (message.member.hasPermission("MANAGE_ROLES")) {
            const targetUser = user;

            if (!targetUser) {
                message.channel.send(
                    "**Please specify a user first!**"
                );
                return;
            }

            const roleName = nameofrole;
            const { guild } = message;

            const role = guild?.roles.cache.find((role) => {
                return role.name === roleName;
            });

            if (!role) {
                message.channel.send(
                    `**There is no role named as "${roleName}"**`
                );
                return;
            }

            const memberUser = guild?.members.cache.get(targetUser.id);
            memberUser?.roles.remove(role);

            const removeRoleEmbed = new MessageEmbed()
                .setTitle("Role Removed! :thumbsup:")
                .setColor("GREEN")
                .setDescription(
                    `**${role} was Successfully removed to ${targetUser} by ${message.author.tag}**`
                )
                .setFooter("Copyright @2021 Falcon");

            message.channel.send(removeRoleEmbed);
        } else {
            message.channel.send("**Insufficient Permissions**");
        }
    },
}

export default RemoveRole;