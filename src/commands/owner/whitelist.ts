import Command from '../../typings/command';
import { Deta } from 'deta'
import { ENV } from '../../classes/env';
const deta = Deta(ENV.db)
const db = deta.Base("blacklist")

const WhitelistCommand: Command = {
    name: 'whitelist',
    description: 'Whitelist a user',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: true,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            const key: any = await db.fetch({ userID: args[0] })
            db.delete(key.items[0].key)
            
            message.channel.send(`${client.users.cache.get(args[0])?.username} has been sucessfully whitelisted.`)
        } catch (err) {
            message.channel.send("**This user is not blacklisted.**")
        }
    },
}

export default WhitelistCommand;