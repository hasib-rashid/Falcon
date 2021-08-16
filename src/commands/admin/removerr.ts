import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'removerr'
export const category = 'admin'
export const description = 'Remove a reaction role'
export const userPermissions: PermissionResolvable = "MANAGE_MESSAGES"

export const run: RunFunction = async (client, message, args) => {
    try {
        if (!message.member?.hasPermission("MANAGE_ROLES"))
            return message.channel.send(
                "**You need `MANAGE_ROLES` permission to use this command**"
            );

        const emoji = args[0];
        if (!emoji)
            return message
                .reply("**You need use a valid emoji.**")
                .then((m) => m.delete({ timeout: 1000 }));

        const msg = await message.channel.messages.fetch(args[1]);
        if (!msg)
            return message
                .reply("**Message not found! Wtf...**")
                .then((m) => m.delete({ timeout: 1000 }));

        await client.reactionRoles.deleteReactionRole({
            message: msg,
            emoji,
        });

        message.reply("Done").then((m) => m.delete({ timeout: 500 }));
    } catch (err) {
        message.channel.send(
            "**An unexpected Error Occured. Use the correct format: `deleteRR <emoji> <messageID>`**"
        );
    }
}