import { RunFunction } from '../../interfaces/Command';

export const name = 'unban'
export const category = 'admin'
export const description = 'Unban a banned user'

export const run: RunFunction = async (client, message, args) => {
    const targetUser = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])


}