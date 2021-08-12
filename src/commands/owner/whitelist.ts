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
        const user = client.users.cache.get(args[0])

        const fetch = await db.fetch({ userID: args[0] })

        console.log(fetch)
    },
}

export default WhitelistCommand;