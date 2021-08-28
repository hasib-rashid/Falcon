import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'createrr'
export const category = 'admin'
export const description = 'Create a Reaction role'
export const userPermissions: PermissionResolvable = "MANAGE_ROLES"

export const run: RunFunction = async (client, message, args) => {
    try {
        if (!message.member.permissions.has("MANAGE_ROLES"))
            return message.channel.send(
                "**You need `MANAGE_ROLES` permission to use this command**"
            );

        const args = message.content.split(" ").slice(1);

        const role = message.mentions.roles.first();
        if (!role)
            return message
                .reply("You need mention a role")
                .then((m) => {
                    setTimeout(() => {
                        m.delete()
                    }, 1000)
                });

        const emoji = args[1];
        if (!emoji)
            return message
                .reply("You need use a valid emoji.")
                .then((m) => {
                    setTimeout(() => {
                        m.delete()
                    }, 1000)
                });

        const msg = await message.channel.messages.fetch(
            args[2] || message.id
        );
        if (!role)
            return message
                .reply("Message not found! Wtf...")
                .then((m) => {
                    setTimeout(() => {
                        m.delete()
                    }, 1000)
                });

        client.reactionRoles.createReactionRole({
            message: msg,
            roles: [role],
            emoji,
            type: 1,
        });

        message.reply("Done").then((m) => {
            setTimeout(() => {
                m.delete()
            }, 1000)
        });
    } catch (err) {
        message.channel.send("**An unexpected Error Occured**");
    }
}