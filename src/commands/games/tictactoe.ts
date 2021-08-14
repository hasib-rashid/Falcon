import { RunFunction } from '../../interfaces/Command';
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe()

export const name = 'tictactoe'
export const category = 'games'
export const description = 'Play Tic Tac Toe in Falcon'
export const aliases = ["ttt"]

export const run: RunFunction = async (client, message, args) => {
    game.handleMessage(message);
}