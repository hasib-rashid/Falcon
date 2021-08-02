import Command from '../../constants/command';

const WikiCommand: Command = {
    name: 'wiki',
    description: 'Search Wikipedia',
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

export default WikiCommand;