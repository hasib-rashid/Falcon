import { RunFunction } from '../../interfaces/Command';
import weky from 'weky'

export const name = 'lieswatter'
export const category = 'games'
export const description = 'Play Lie Swatter'

export const run: RunFunction = async (client, message, args) => {
    await weky.LieSwatter({
        message: message,
        embed: {
            title: 'Lie Swatter | Falcon',
            color: 'BLUE',
            timestamp: true,
        },
        thinkMessage: 'I am thinking',
        winMessage:
            '**GG, It was a **{{answer}}**. You got it correct in *{{time}}*.**',
        loseMessage: '**Better luck next time! It was a *{{answer}}*.**',
        othersMessage: '**Only <@{{author}}> can use the buttons!**',
        buttons: { true: 'Truth', lie: 'Lie' },
    });
}