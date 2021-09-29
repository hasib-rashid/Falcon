import { sentence } from 'txtgen';
import { FastType } from 'weky';
import { RunFunction } from '../../interfaces/Command';

export const name = 'fasttype'
export const category = 'games'
export const description = 'Type as fast as possible within 1 minute'

export const run: RunFunction = async (client, message, args) => {
    await FastType({
        message: message,
        embed: {
            title: 'FastType | Falcon',
            description: '**You have ***{{time}}*** to type the below sentence.**',
            color: '#5865F2',
            footer: '©️ Falcon',
            timestamp: true
        },
        sentence: sentence(),
        winMessage: '**GG, you have a wpm of ***{{wpm}}*** and You made it in ***{{time}}***.**',
        loseMessage: '**Better luck next time!**',
        cancelMessage: '**You ended the game!**',
        time: 60000,
        buttonText: 'Cancel',
        othersMessage: '**Only <@{{author}}> can use the buttons!**'
    });
}