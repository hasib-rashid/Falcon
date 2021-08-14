import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'deletechannel'
export const category = 'admin'
export const description = 'Delete a channel'
export const userPermissions: PermissionResolvable = "MANAGE_CHANNELS"

export const run: RunFunction = async (client, message, args) => {
    if (!message.member?.hasPermission("MANAGE_CHANNELS"))
        return message.channel.send(
            "**You need `MANAGE_CHANNELS` permission to use this command**"
        );
    const channel = message.mentions.channels.first() || message.guild?.channels.cache.get(args[0])

    if (!channel) return message.channel.send("**Please mention a channel to delete**")

    // @ts-ignore
    message.guild?.channels.cache.get(channel?.id)?.delete()

    message.channel.send("**Successfully Deleted the Channel**")
}