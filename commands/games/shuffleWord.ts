import Command from '../../constants/command';

const ShuffleWordCommand: Command = {
    name: 'shuffleword',
    description: 'Solve a Shuffled Word',
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

export default ShuffleWordCommand;