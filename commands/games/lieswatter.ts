import Command from '../../constants/command';

const LieSwatterCommand: Command = {
    name: 'lieswatter',
    description: 'Swat a Lie',
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

export default LieSwatterCommand;