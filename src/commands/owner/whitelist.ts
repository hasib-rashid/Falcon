import { RunFunction } from '../../interfaces/Command';
import { Deta } from 'deta'
import { env } from '../../client/env';
const deta = Deta(env.db)
const db = deta.Base("blacklist")

export const name = 'whitelist'
export const category = 'owner'
export const description = 'Whitelist a Blacklisted User'

export const run: RunFunction = async (client, message, args) => {
    const user = client.users.cache.get(args[0])

    const fetch = await db.fetch({ userID: args[0] })

    db.delete((fetch.items[0].key as any))

    message.channel.send("**Successfully Whitelisted the User**")
}