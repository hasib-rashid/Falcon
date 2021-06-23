import Command from '../../constants/command';

const PandaCommand: Command = {
    name: 'panda',
    description: 'Watch panda here?',
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

export default PandaCommand;