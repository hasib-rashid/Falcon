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
    },
}

export default SetPrefixCommand;