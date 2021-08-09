import { Command, RunFunction } from '../../typings/command';

const command: Command = {
    name: "ping",
    category: "general",
    description: "Pong Command",
    aliases: [],
    ownerOnly: false,
    usage: `ping`,
    userPermissions: "SEND_MESSAGES",
    cooldown: 0,

    run: async (client, message) => {
        message.channel.send("Pong")
    }
}

export default command;
