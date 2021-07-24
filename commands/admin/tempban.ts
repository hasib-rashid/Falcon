import Command from '../../constants/command';

const TempBanCommand: Command = {
    name: 'tempban',
    description: 'Temporarily ban someone from the server',
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

export default TempBanCommand;