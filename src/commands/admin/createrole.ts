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

        let color: any
        let name: any

        message.channel.send("**What should be the color of the role?**")
        await message.channel.awaitMessages({ filter: (m: Message) => m.author.id === message.author.id, max: 1, time: 30000 }).then(collected => {
            if (collected.first().author.id !== message.author.id) return;
            color = collected.first()?.content
        }).catch(() => {
            message.reply('**No answer after 30 seconds, operation canceled.**');
        })

        message.channel.send("**What should be the name of the role?**")
        await message.channel.awaitMessages({ filter: (m: Message) => m.author.id === message.author.id, max: 1, time: 30000 }).then(collected => {
            if (collected.first().author.id !== message.author.id) return;
            name = collected.first()?.content
        }).catch(() => {
            message.reply('**No answer after 30 seconds, operation canceled.**');
        })

        message.guild?.roles.create({ color: color || "", name: name || "" })
        message.channel.send(`**Successfully Created the Role**`)

    } catch (err) {
        message.channel.send("**There has been a error. Please check if everything is right and try again. Example: `.createrole aqua role-name`**")
    }
}