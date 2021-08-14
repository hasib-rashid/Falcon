import { RunFunction } from '../../interfaces/Command';
import TMath from 'tmath'

export const name = 'calculator'
export const category = 'general'
export const description = 'Use the Calculator to do Maths'
export const aliases = ["calc"]

export const run: RunFunction = async (client, message, args) => {
    try {
        const calculator = new TMath({
            //Setup
            destroy: "Oh no, you locked me! :O", // Optional, default is "Calculator Locked"
            invalid: "Next time just put in a valid calculation!", // Optional, default is "Invalid Calculation"
            notauthor: "You aren't the calculatorowner c.c", // Optional, default is "Only the author can use the calculator! Run the command to create you're own."
            deactivatemessasge: "I deactivated me :x", // Optional, default is "The Calculator got deactivated"
            deactivatetime: 1000000, // Optional, default are 10 minutes
            message: message, // Required, the message that triggered the Messageevent/Command
        });

        await calculator.start()
    } catch (err) {
        console.error(err)
        message.channel.send("**There has been a error. Please try again with a valid math logic**")
    }
}