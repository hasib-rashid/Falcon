const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const { SnakeCord } = require("reconlx");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "snakecord",
            aliases: ["snake", "snake-cord", "snake-game", "snakegame"],
            group: "games",
            memberName: "snakecord",
            description: "Play a game of Snake Cord",
            details: oneLine`
                Play a game of Snake Cord
            `,
            examples: ["!snakecord"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const snakeGame = new SnakeCord({
            title: "Snake Game | CodeVert",
            color: "#037ffc",
            timestamp: false,
            gameOverTitle: "**❌ Game Over ❌**",
        });

        return snakeGame.newGame(message);
    }
};
