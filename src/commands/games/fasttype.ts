import { RunFunction } from '../../interfaces/Command';
import weky from 'weky'
import '@weky/inlinereply'
import { sentence } from 'txtgen'

export const name = 'fasttype'
export const category = 'games'
export const description = 'Type Fast enough to win'

export const run: RunFunction = async (client, message, args) => {
    await weky.FastType({
        message: message,
        embed: {
            title: 'FastType | Falcon',
            description: '**You have **{{time}}** to type the below sentence.**',
            color: 'BLUE',
            timestamp: true
        },
        sentence: sentence(),
        winMessage: '**GG, you have a wpm of **{{wpm}}** and You made it in **{{time}}**.**',
        loseMessage: '**Better luck next time!**',
        cancelMessage: '**You ended the game!**',
        time: 60000,
        buttonText: 'Cancel',
        othersMessage: '**Only <@{{author}}> can use the buttons!**'
    });
}