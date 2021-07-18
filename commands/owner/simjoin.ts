import Command from '../../constants/command';

const SimJoinCommand: Command = {
    name: 'simjoin',
    description: 'Simulate a Join',
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

export default SimJoinCommand;