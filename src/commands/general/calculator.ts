import { RunFunction } from '../../interfaces/Command';
import weky from 'weky'
require("@weky/inlinereply")

export const name = 'calculator'
export const category = 'general'
export const description = 'Use the Calculator to do Maths'
export const aliases = ["calc"]

export const run: RunFunction = async (client, message, args) => {
    try {
        await weky.Calculator({
            message: message,
            embed: {
                title: 'Calculator | Falcon',
                color: '#3982f7',
                timestamp: true
            },
            disabledQuery: 'Calculator is disabled!',
            invalidQuery: 'The provided equation is invalid!',
            othersMessage: 'Only <@{{author}}> can use the buttons!'
        });
    } catch (err) {
        console.error(err)
        message.channel.send("**There has been a error. Please try again with a valid math logic**")
    }
}