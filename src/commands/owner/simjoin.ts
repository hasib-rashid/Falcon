import Command from '../../constants/command';

const SimJoinCommand: Command = {
    name: 'simjoin',
    description: 'Simulate a Join',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: true,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        // @ts-ignore
        client.emit("guildMemberAdd", message.member)

        message.channel.send("**Successfully Simulated GuildMemberAdd**")
    },
}

export default SimJoinCommand;