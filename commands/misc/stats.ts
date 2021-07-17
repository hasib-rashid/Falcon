import Command from '../../constants/command';

const StatsCommand: Command = {
    name: 'stats',
    description: 'Watch the latest stats of Falcon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        //Code Here!!!!
    },
}

export default StatsCommand;