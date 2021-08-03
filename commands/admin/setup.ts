import Command from '../../constants/command';

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

    },
}

export default SetupCommand;