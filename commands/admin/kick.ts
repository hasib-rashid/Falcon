import Command from '../../constants/command';

const KickCommand: Command = {
    name: 'kick',
    description: 'Kick someone from the server',
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

export default KickCommand;