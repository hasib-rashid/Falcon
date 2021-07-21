import Command from '../../constants/command';

const UnlockCommand: Command = {
    name: 'unlock',
    description: 'Unlock the locked Channel',
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

export default UnlockCommand;