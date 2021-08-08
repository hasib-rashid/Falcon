import Command from '../../constants/command';
// @ts-ignore
import weky from 'weky'
import { default as axios } from 'axios'
import { sentence } from 'txtgen'

const FastTypeCommand: Command = {
    name: 'fasttype',
    description: 'Type a sentence Fast and Furious',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get("https://random-words-api.vercel.app/word").then(async (res) => {
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
        })
    },
}

export default FastTypeCommand;