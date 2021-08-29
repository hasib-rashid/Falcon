import { RunFunction } from '../../interfaces/Command';
// @ts-ignore
import weky from 'weky'
const dif = ["easy", "medium", "hard"]

export const name = 'trivia'
export const category = 'games'
export const description = 'Play some trivia'

export const run: RunFunction = async (client, message, args) => {
    await weky.Trivia({
        message: message,
        embed: {
            title: 'Trivia | Falcon',
            description: 'You only have **{{time}}** to guess the answer!',
            color: '#7289da',
            timestamp: true,
        },
        difficulty: dif[Math.floor(Math.random() * dif.length)],
        thinkMessage: '**I am thinking**',
        winMessage:
            '**GG, It was *{{answer}}*. You gave the correct answer in *{{time}}*.**',
        loseMessage: '**Better luck next time! The correct answer was *{{answer}}*.**',
        emojis: {
            one: '1️⃣',
            two: '2️⃣',
            three: '3️⃣',
            four: '4️⃣',
        },
        othersMessage: '**Only <@{{author}}> can use the buttons!**',
        returnWinner: false,
    });
}