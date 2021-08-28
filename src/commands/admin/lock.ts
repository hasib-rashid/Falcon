import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'lock'
export const category = 'admin'
export const description = 'Lock a channel'
export const userPermissions: PermissionResolvable = "MANAGE_CHANNELS"

export const run: RunFunction = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
        return message.channel.send(
            "**You need `MANAGE_CHANNELS` permission to use this command**"
        );
    // @ts-ignore
    message.channel.updateOverwrite(message.guild?.roles.everyone, { SEND_MESSAGES: false }).then(() => {
        message.channel.send('**Channel has been locked**');
    }).catch((error: any) => {
        console.log(error);
    });
}