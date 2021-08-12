import Command from '../../typings/command';
import { Deta } from 'deta'
import { ENV } from '../../classes/env';

const deta = Deta(ENV.db)
const db = deta.Base("guild")

const SetPrefixCommand: Command = {
    name: 'setprefix',
    description: 'Set the prefix to something else',
    aliases: [
        'prefix', 'prefixset'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {

        const newPrefix = args.join(" ")

        if (!newPrefix) return message.channel.send("**Please Mention a prefix to set**")

        const prefix = await db.fetch({ guildID: message.guild?.id })

        if (!prefix.items[0]) {
            db.put({ guildID: message.guild.id, prefix: args.join(" ") })
        } else {
            const key: any = prefix.items[0].key
            db.update({ prefix: args.join(" ") }, key)
        }

        message.channel.send(`**Successfully Changed the server prefix from \`${prefix.items[0].prefix}\` to \`${newPrefix}\`**`)
    },
}

export default SetPrefixCommand;