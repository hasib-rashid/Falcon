import dotenv from 'dotenv'
dotenv.config()

import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { Deta } from 'deta'

const deta = Deta(process.env.DB)
const db = deta.Base("guild")

export const name = 'setprefix'
export const category = 'admin'
export const description = 'Set the prefix of a server'
export const userPermissions: PermissionResolvable = "MANAGE_GUILD"
export const aliases = ["prefix"]

export const run: RunFunction = async (client, message, args) => {
    if (message.member.permissions.has("MANAGE_GUILD")) {
        if (!message.member.permissions.has("MANAGE_CHANNELS"))
            return message.channel.send(
                "**You need `MANAGE_CHANNELS` permission to use this command**"
            );
    }

    const newPrefix = args.join(" ")

    if (!newPrefix) return message.channel.send("**Please Mention a prefix to set**")

    const prefix = await db.fetch({ guildID: message.guild?.id })
    let oldPrefix

    try {
        oldPrefix = prefix.items[0].prefix
    } catch (err) {
        oldPrefix = client.prefix
    }

    try {
        const key: any = prefix.items[0].key
        db.update({ prefix: args.join(" ") }, key)
    } catch (err) {
        db.put({ guildID: message.guild.id, prefix: args.join(" ") })
    }

    message.channel.send(`**Successfully Changed the server prefix from \`${oldPrefix}\` to \`${newPrefix}\`**`)
}