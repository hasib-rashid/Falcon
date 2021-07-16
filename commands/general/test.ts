import Command from '../../constants/command';
import GuildUser from '../../models/GuildUser'
import { AdminCommands, GeneralCommands } from '../../classes/client'

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
        for (var i = 0; i < GeneralCommands.length; ++i) {
            console.log(GeneralCommands[0][i])
        }
    },
}

export default TestCommand;