const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const TicTacToe = require("discord-tictactoe");
const game = new TicTacToe({ language: "en" });

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ttt",
            aliases: [],
            group: "games",
            memberName: "ttt",
            description: "Play Tick Tac Toe with your friends",
            details: oneLine`
                Play Tick Tac Toe with your friends
            `,
            examples: ["!ttt <@user> / !ttt"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            game.handleMessage(message);
        } catch (err) {
            console.error(err);
        }
    }
};
