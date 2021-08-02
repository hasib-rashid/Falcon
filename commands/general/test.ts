import { MessageEmbed } from 'discord.js';
import Command from '../../constants/command';
import GuildModel from '../../models/GuildModel'

const TestCommand: Command = {
    name: 'test',
    description: 'This is for test only',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const oldPrefix = client.prefix
        const newPrefix = args.join(" ")

        GuildModel.create({ guildID: message.guild?.id, prefix: "$" })
        message.channel.send(`**Successfully Changed the server prefix from \`${oldPrefix}\` to \`${newPrefix}\``)
    },
}

export default TestCommand;