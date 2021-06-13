import Command from '../../constants/command';
import GuildUser from '../../models/GuildUser'

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
        GuildUser.sync()
        GuildUser.create({ userID: message.author.id, guildID: message.guild?.id })

        message.channel.send("Successfully stored to Database!")
    },
}

export default TestCommand;