import Command from '../../constants/command';

const NPMCommand: Command = {
    name: 'npm',
    description: 'Search The Node Package Manager',
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

export default NPMCommand;