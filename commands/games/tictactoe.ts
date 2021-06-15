import Command from '../../constants/command';

const TicTacToeCommand: Command = {
    name: 'tictactoe',
    description: 'Play tictactoe is discord',
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

export default TicTacToeCommand;