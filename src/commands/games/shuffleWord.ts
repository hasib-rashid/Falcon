import { RunFunction } from '../../interfaces/Command';
// @ts-ignore
import weky from 'weky'

export const name = 'shuffleword'
export const category = 'games'
export const description = 'Shuffle Words'

export const run: RunFunction = async (client, message, args) => {
    await weky.ShuffleGuess({
        message: message,
        embed: {
            title: 'Shuffle Guess | Falcon',
            color: '#7289da',
            timestamp: true,
        },
        word: ['voice'],
        button: { cancel: 'Cancel', reshuffle: 'Reshuffle' },
        startMessage:
            'I shuffled a word it is **`{{word}}`**. You have **{{time}}** to find the correct word!',
        winMessage:
            'GG, It was **{{word}}**! You gave the correct answer in **{{time}}.**',
        loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
        incorrectMessage: "No {{author}}! The word isn't `{{answer}}`",
        othersMessage: 'Only <@{{author}}> can use the buttons!',
        time: 60000,
    });
}