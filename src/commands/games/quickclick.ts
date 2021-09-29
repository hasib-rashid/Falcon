import { QuickClick } from 'weky';
import { RunFunction } from '../../interfaces/Command';

export const name = 'quickclick'
export const category = 'games'
export const description = 'Quickly Click the button'

export const run: RunFunction = async (client, message, args) => {
    await QuickClick({
        message: message,
        embed: {
            title: 'Quick Click | Falcon',
            color: '#5865F2',
            footer: '©️ Falcon',
            timestamp: true
        },
        time: 60000,
        waitMessage: '**The buttons may appear anytime now!**',
        startMessage:
            'First person to press the correct button will win. You have ***{{time}}***!**',
        winMessage: 'GG, <@{{winner}}> pressed the button in ***{{time}} seconds***.**',
        loseMessage: '**No one pressed the button in time. So, I dropped the game!**',
        emoji: '👆',
        ongoingMessage:
            "**A game is already runnning in <#{{channel}}>. You can't start a new one!**"
    });
}