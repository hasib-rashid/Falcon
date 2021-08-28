import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'deleterole'
export const category = 'admin'
export const description = 'Delete a role'
export const userPermissions: PermissionResolvable = "MANAGE_ROLES"

export const run: RunFunction = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
        return message.channel.send(
            "**You need `MANAGE_CHANNELS` permission to use this command**"
        );

    const role = message.mentions.roles.first() || message.guild?.roles.cache.get(args[0])

    if (!role) return message.channel.send("**Please specify a role to delete**")

    // @ts-ignore
    message.guild?.roles.cache.get(role?.id)?.delete()

    message.channel.send("**Succesfully Deleted the role**")
}