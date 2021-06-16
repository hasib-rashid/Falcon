import Command from '../../constants/command';
import { createCanvas } from 'canvas'
import { default as axios } from 'axios'

const TriviaCommand: Command = {
    name: 'trivia',
    description: 'Play trivia in discord',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        await axios.get("https://opentdb.com/api.php", {
            params: {
                amount: 1,
                type: args[0],
                encode: 'url3986',
                difficulty: args[1]
            }
        }).then((res) => {
            if (!res.data) return message.channel.send('**A question could not be fetched at the moment. Try again later!**');

            const answers = res.data[0].incorrect_answers.map((answer: any) => decodeURIComponent(answer.toLowerCase()));
            const correct = decodeURIComponent(res.data[0].correct_answer.toLowerCase());
            answers.push(correct);

            console.log(res.data)
        })
    },
}

export default TriviaCommand;