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

    },
}

export default TestCommand;