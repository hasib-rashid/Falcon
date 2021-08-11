import { MessageEmbed } from 'discord.js';
import Command from '../../typings/command';

const SetupCommand: Command = {
    name: 'setup',
    description: 'Setup the server',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.permissions.has("MANAGE_GUILD"))
            return message.channel.send(
                "**You need `MANAGE_GUILD` permission to use this command**"
            );

        const embed = new MessageEmbed()
            .setAuthor(message.guild?.name, message.guild?.iconURL() || "")
            .setTitle(`Setup ${message.guild?.name}`)
            .setColor("BLUE")
            .setTimestamp()
            .setFooter("Falcon Bot")
            .setDescription(`
                **prefix** - Change the prefix of the server.

                ***Note: More are coming as the Bot Updates.***
            `)

        message.channel.send({ embeds: [embed] })
    },
}

export default SetupCommand;