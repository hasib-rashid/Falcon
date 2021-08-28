import { RunFunction } from '../../interfaces/Command';

export const name = 'simjoin'
export const category = 'owner'
export const description = 'Simulate Join'

export const run: RunFunction = async (client, message, args) => {
    client.emit("guildMemberAdd", message.member)

    message.channel.send("**Successfully Simulated GuildMemberAdd**")
}