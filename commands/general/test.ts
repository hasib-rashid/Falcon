import { MessageEmbed } from 'discord.js';
import Command from '../../constants/command';

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
        message.guild?.roles.cache.get("856852868602527795")?.delete()
    },
}

export default TestCommand;