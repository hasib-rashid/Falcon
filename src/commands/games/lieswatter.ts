import { LieSwatter } from 'weky';
import { RunFunction } from '../../interfaces/Command';

export const name = 'lieswatter'
export const category = 'games'
export const description = 'Swat some lies ig'

export const run: RunFunction = async (client, message, args) => {
    await LieSwatter({
        message: message,
        embed: {
            title: 'Lie Swatter | Falcon',
            color: '#5865F2',
            footer: '©️ Falcon',
            timestamp: true
        },
        thinkMessage: '**I am thinking**',
        winMessage:
            '**GG, It was a **{{answer}}**. You got it correct in ***{{time}}***.**',
        loseMessage: '**Better luck next time! It was a ***{{answer}}***.**',
        othersMessage: '**Only <@{{author}}> can use the buttons!**',
        buttons: { true: 'Truth', lie: 'Lie' }
    });

}