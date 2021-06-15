import Command from '../../constants/command';
// @ts-ignore
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe()

const TicTacToeCommand: Command = {
    name: 'ttt',
    description: 'Play tictactoe in disord',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        game.handleMessage(message);
    },
}

export default TicTacToeCommand;