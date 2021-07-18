import Command from '../../constants/command';

const UptimeCommand: Command = {
    name: 'uptime',
    description: 'Check the uptime of Falcon',
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

export default UptimeCommand;