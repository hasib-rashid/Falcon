import Command from '../../constants/command';

const GoogleCommand: Command = {
    name: 'google',
    description: 'Google anything on Falcon',
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

export default GoogleCommand;