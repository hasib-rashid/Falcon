import Command from '../../constants/command';
// @ts-ignore
import weky from 'weky'

const ShuffleWordCommand: Command = {
    name: 'shuffleword',
    description: 'Solve a Shuffled Word',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
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

    },
}

export default ShuffleWordCommand;