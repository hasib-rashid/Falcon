import { MessageEmbed, PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'addrole'
export const category = 'admin'
export const description = 'Add Role to a User'
export const userPermissions: PermissionResolvable = "MANAGE_ROLES"

export const run: RunFunction = async (client, message, args) => {
    const user = message.mentions.users.first() || message.guild?.members.cache.get(args[0])
    const nameofrole = message.mentions.roles.first()?.name || message.guild.roles.cache.get(args[1]).name

    if (message.member.permissions.has("MANAGE_ROLES")) {
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
        memberUser?.roles.add(role);

        const addRoleEmbed = new MessageEmbed()
            .setTitle("Role Added! :thumbsup:")
            .setColor("GREEN")
            .setDescription(
                `**${role} was Successfully added to ${targetUser} by ${message.author.tag}**`
            )
            .setFooter("Copyright @2021 Falcon");

        message.channel.send({ embeds: [addRoleEmbed] });
    } else {
        message.channel.send("**Insufficient Permissions**");
    }
}