import { RunFunction } from '../../interfaces/Command';
import { Snake } from 'discord-gamecord'

export const name = 'snake'
export const category = 'games'
export const description = 'Play the old fashion Snake here'

export const run: RunFunction = async (client, message, args) => {
    new Snake({
        message: message,
        embed: {
            title: 'Snake Game',
            color: '#5865F2',
            OverTitle: "Game Over",
        },
        snake: { head: '🟢', body: '🟩', tail: '🟢' },
        emojis: {
            board: '⬛',
            food: '🍎',
            up: '⬆️',
            right: '➡️',
            down: '⬇️',
            left: '⬅️',
        },
        othersMessage: 'You are not allowed to use buttons for this message!',
    }).startGame();
}