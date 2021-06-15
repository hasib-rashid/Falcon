import Command from '../../constants/command';
import { Message, MessageEmbed } from 'discord.js';
import { isSubset, In } from './tttUtil'

let idToGame = {};

class Game {
    public ids: any;
    public players: any;
    public turn: any;
    public board: any;
    public x: any;
    public o: any;

    constructor(ctx: any, player1: any, player2: any) {
        this.ids = [player1, player2];
        this.players = [[], []];
        this.turn = Math.round(Math.random());
        this.board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        this.x = this.ids[this.turn];
        this.o = this.ids[(this.turn + 1) % 2];
        this.recap(ctx);
    }

    recap(ctx: any) {
        this.sendMessage(ctx, `${this.x} is X, ${this.o} is O`);
        this.sendMessage(ctx, this.ids[this.turn] + " It's your turn!");
        this.sendBoard(ctx);
    }

    checkBoard() {
        if (this.players[0].length + this.players[1].length == 9) return 2;

        let wins = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]];

        for (let w of wins) {
            if (isSubset(this.players[0], w)) return 0;
            if (isSubset(this.players[1], w)) return 1;
        }
        return false;
    }

    sendBoard(ctx: any) {
        this.sendMessage(ctx, "```" + this.board.map((x: any) => x.join(" | ")).join('\n') + "```");
    }

    sendMessage(ctx: any, message: any) {
        ctx.channel.send(message);
    }

    nextPlayer() {
        this.turn = (this.turn + 1) % 2;
    }

    win(ctx: any, result: any) {
        this.sendBoard(ctx);
        if (result == 2) this.sendMessage(ctx, "Tie!");
        else this.sendMessage(ctx, this.ids[result] + " wins!!!");
        return true;
    }

    play(ctx: any, args: string[], senderId: string) {
        if (senderId !== this.ids[this.turn]) {
            return this.sendMessage(ctx, "It's not your turn.");
        }

        let num = parseInt(args[0]);

        if (isNaN(num)) return this.sendMessage(ctx, "That's not a number!");
        if (num < 1 || num > 9) return this.sendMessage(ctx, "Invalid number!");

        let row = Math.floor((num - 1) / 3);
        let col = (num - 1) % 3;
        if (In(this.board[row][col], ['X', 'O'])) return this.sendMessage(ctx, "Tile already placed in that position");
        this.board[row][col] = this.x == this.ids[this.turn] ? 'X' : 'O';
        this.players[this.turn].push(num);

        let result = this.checkBoard();
        if (result !== false) return this.win(ctx, result);
        this.nextPlayer();
        this.sendMessage(ctx, this.ids[this.turn] + " It's your turn!");
        this.sendBoard(ctx);

        return false;
    }
}


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