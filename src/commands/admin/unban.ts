import { RunFunction } from '../../interfaces/Command';

export const name = 'unban'
export const category = 'admin'
export const description = 'Unban a banned user'

export const run: RunFunction = async (client, message, args) => {
    const targetUser = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

    message.guild.fetchBans().then((bans) => {
        if (bans.size === 0) return message.channel.send("**There is no users banned**")

        const banUser = bans.find((b) => b.user.id === args[0])

        if (!banUser) return message.channel.send("**This user is not banned**")

        message.guild.members.unban(banUser.user)

        message.channel.send("**Successfully Unbanned the user**")
    })
}