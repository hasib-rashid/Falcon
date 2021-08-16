import { RunFunction } from '../../interfaces/Command';
import SnakeGame from "snakecord"

export const name = 'snakecord'
export const category = 'games'
export const description = 'Play SnakeCord in Falcon'

export const run: RunFunction = async (client, message, args) => {
    // @ts-ignore
    return SnakeGame.newGame(message);
}