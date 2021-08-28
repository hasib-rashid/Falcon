import { RunFunction } from '../../interfaces/Command';

export const name = 'simleave'
export const category = 'owner'
export const description = 'Simulate Leave'

export const run: RunFunction = async (client, message, args) => {
    client.emit("guildMemberRemove", message.member)

    message.channel.send("**Successfully Simulated GuildMemberRemove**")
}