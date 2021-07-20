import Command from '../../constants/command';

const SlowmodeCommand: Command = {
    name: 'slowmode',
    description: 'Set the slowmode of the channel',
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

export default SlowmodeCommand;