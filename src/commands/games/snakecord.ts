import { RunFunction } from '../../interfaces/Command';
// @ts-ignore
import SnakeGame from "snakecord"

export const name = 'snakecord'
export const category = 'games'
export const description = 'Play SnakeCord in Falcon'

const snakeGame = new SnakeGame({
    title: 'Snake Game',
    color: "GREEN",
    timestamp: false,
    gameOverTitle: "Game Over"
});

export const run: RunFunction = async (client, message, args) => {
    // @ts-ignore
    return snakeGame.newGame(message);
}