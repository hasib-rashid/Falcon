import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'unlock'
export const category = 'admin'
export const description = 'Unlock a channel'
export const userPermissions: PermissionResolvable = "MANAGE_CHANNELS"

export const run: RunFunction = async (client, message, args) => {
    // @ts-ignore
    message.channel.updateOverwrite(message.guild?.roles.everyone, { SEND_MESSAGES: true }).then(() => {
        message.channel.send('**Channel has been Unlocked**');
    }).catch((error: any) => {
        console.log(error);
    });
}