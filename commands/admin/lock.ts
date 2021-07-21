import Command from '../../constants/command';

const LockCommand: Command = {
    name: 'lock',
    description: 'Lock the channel',
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

export default LockCommand;