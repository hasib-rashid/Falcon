import { MessageEmbed } from 'discord.js';
import Command from '../../constants/command';

const PingCommand: Command = {
    name: 'ping',
    description: 'See the Ping of Falcon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        message.channel.send("Loading data! :thinking:").then(async (msg) => {
            const pingEmbed = new MessageEmbed()
                .setTitle("Ping")
                .setAuthor(`Requested by ${message.author.tag}`)
                .setDescription(
                    `🏓 Pong! Your Latency is ${msg.createdTimestamp - message.createdTimestamp
                    }ms and API Latency is ${Math.round(
                        client.ws.ping
                    )} ms!`
                );

            if (client.ws.ping < 120) pingEmbed.setColor("GREEN");

            if (client.ws.ping < 500) pingEmbed.setColor("YELLOW");

            if (client.ws.ping > 500) pingEmbed.setColor("RED");

            message.channel.send(pingEmbed);
        });
    },
}

export default PingCommand;