import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'lockdown'
export const category = 'admin'
export const description = 'Lockdown the server'
export const userPermissions: PermissionResolvable = "MANAGE_CHANNELS"

export const run: RunFunction = async (client, message, args) => {
    const role = message.guild?.roles.everyone;

    const perms = role?.permissions.toArray();

    const newPerms = perms?.filter((perm) => perm !== "SEND_MESSAGES");

    await role?.edit({ permissions: newPerms });

    message.channel.send(
        "**:lock: Locked down the Server! Use `unlockdown` command to Unlock the Lockdown!**"
    );
}