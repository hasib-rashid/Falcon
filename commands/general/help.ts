import Command from '../../constants/command';

const HelpCommand: Command = {
    name: 'help',
    description: 'Get all the help here',
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

export default HelpCommand;