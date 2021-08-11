import Command from '../../constants/command';
import SnakeGame from "snakecord"

const snakeGame = new SnakeGame({
    title: 'Snake',
    color: "#227ef5",
    timestamp: true,
    gameOverTitle: "Game Over!"
});

const SnakeCord: Command = {
    name: 'snake',
    description: 'Play snake in discord',
    aliases: [
        'snakecord', 'discord-snake'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        return snakeGame.newGame(message);
    },
}

export default SnakeCord;