import Command from '../../typings/command';
import { Deta } from 'deta'
import { ENV } from '../../classes/env';
const deta = Deta(ENV.db)
const db = deta.Base("blacklist")

const BlackListCommand: Command = {
    name: 'blacklist',
    description: 'Blacklist someone from Falcon',
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
        const reason = args.slice(1).join(' ') || "No Reason";

        try {
            db.put({ userID: user.id, time: Date.now(), reason: reason, condition: true })
            message.channel.send("**Sucessfully Blacklisted this user**")
        } catch (err) {
            message.channel.send("**This user is already Blacklisted**")
        }
    },
}

export default BlackListCommand;