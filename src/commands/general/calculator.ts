import { RunFunction } from '../../interfaces/Command';
import { Calculator } from 'weky'

export const name = 'calculator'
export const category = 'general'
export const description = 'Use the Calculator to do Maths'
export const aliases = ["calc"]

export const run: RunFunction = async (client, message, args) => {
    try {
        await Calculator({
            message: message,
            embed: {
                title: 'Calculator | Falcon',
                color: '#5865F2',
                footer: '©️ Falcon',
                timestamp: true,
            },
            disabledQuery: '**Calculator is disabled!**',
            invalidQuery: '**The provided equation is invalid!**',
            othersMessage: '**Only <@{{author}}> can use the buttons!**',
        });
    } catch (err) {
        console.error(err)
        message.channel.send("**There has been a error. Please try again with a valid math logic**")
    }
}