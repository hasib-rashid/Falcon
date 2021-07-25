import Command from '../../constants/command';

const FightCommand: Command = {
    name: 'fight',
    description: 'Fight with someone else in this server',
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

export default FightCommand;