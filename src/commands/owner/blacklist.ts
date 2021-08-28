import { RunFunction } from '../../interfaces/Command';
import { Deta } from 'deta'
import { env } from '../../client/env';
const deta = Deta(env.db)
const db = deta.Base("blacklist")

export const name = 'blacklist'
export const category = 'owner'
export const description = 'Blacklist Someone in Discord'

export const run: RunFunction = async (client, message, args) => {
    const user = client.users.cache.get(args[0])
    const reason = args.slice(1).join(' ') || "No Reason";

    try {
        db.put({ userID: user.id, time: Date.now(), reason: reason, condition: true })
        message.channel.send("**Sucessfully Blacklisted this user**")
    } catch (err) {
        message.channel.send("**This user is already Blacklisted**")
    }
}