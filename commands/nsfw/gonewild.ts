import Command from '../../constants/command';

const GoneWildCommand: Command = {
    name: 'gonewild',
    description: 'NSFW gonewild',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: true,
    cooldown: 0,

    async run(client, message, args) {

    },
}

export default GoneWildCommand;