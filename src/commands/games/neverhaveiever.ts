import { NeverHaveIEver } from 'weky';
import { RunFunction } from '../../interfaces/Command';

export const name = 'neverhaveiever'
export const category = 'games'
export const description = 'Never have I ever.....'

export const run: RunFunction = async (client, message, args) => {
    await NeverHaveIEver({
        message: message,
        embed: {
            title: 'Never Have I Ever | Falcon',
            color: '#5865F2',
            footer: '©️ Falcon',
            timestamp: true
        },
        thinkMessage: '**I am thinking**',
        othersMessage: '**Only <@{{author}}> can use the buttons!**',
        buttons: { optionA: 'Yes', optionB: 'No' }
    });
}