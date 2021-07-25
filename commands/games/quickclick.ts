import Command from '../../constants/command';

const QuickClickCommand: Command = {
    name: 'quickclick',
    description: 'Quickly Click the button',
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

export default QuickClickCommand;