import Command from '../../constants/command';

const BoobsCommand: Command = {
    name: 'boobs',
    description: 'NSFW boobs',
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

export default BoobsCommand;