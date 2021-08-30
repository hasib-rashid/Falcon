import { RunFunction } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js';
import { promptMessage } from "../../util/functions"
import { User } from 'discord.js';

const chooseArr = ["🗻", "📰", "✂"];

export const name = 'rps'
export const category = 'games'
export const description = 'Rock Papper Scissors'

export const run: RunFunction = async (client, message, args) => {
    try {

    } catch {
        return message.channel.send('**Missing Permissions - [MANAGE_MESSAGES]!**')
    }
    function getResult(me: any, botChosen: any) {
        if ((me === "🗻" && botChosen === "✂") ||
            (me === "📰" && botChosen === "🗻") ||
            (me === "✂" && botChosen === "📰")) {
            return "You won!";
        } else if (me === botChosen) {
            return "Its a tie!";
        } else {
            return "You lost!";
        }

    }
}