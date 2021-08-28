import { ColorResolvable, Message, MessageComponentInteraction, MessageInteraction, PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'createrole'
export const category = 'admin'
export const description = 'Create a Role'
export const userPermissions: PermissionResolvable = "MANAGE_ROLES"

export const run: RunFunction = async (client, message, args) => {
    try {
        if (!message.member.permissions.has("MANAGE_ROLES"))
            return message.channel.send(
                "**You need `MANAGE_ROLES` permission to use this command**"
            );

        const color: any = args[0].toUpperCase() || "DEFAULT"
        const name = args[1]
        message.guild?.roles.create({ color: color || "", name: name || "" })
        message.channel.send(`**Successfully Created the Role**`)

    } catch (err) {
        message.channel.send("**There has been a error. Please check if everything is right and try again. Example: `.createrole aqua role-name`**")
    }
}