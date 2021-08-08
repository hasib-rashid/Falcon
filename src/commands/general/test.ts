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
        GuildModel.findOne({ where: { guildID: message.guild?.id } }).then((response) => {
            console.log(response)
        })
    },
}

export default TestCommand;