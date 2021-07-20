import Command from '../../constants/command';

const PurgeCommand: Command = {
    name: 'purge',
    description: 'Delete a certain amount of messages with just one command',
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

export default PurgeCommand;