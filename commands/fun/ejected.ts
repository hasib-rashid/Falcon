import Command from '../../constants/command';

const EjectCommand: Command = {
    name: 'eject',
    description: 'Eject someone off',
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

export default EjectCommand;