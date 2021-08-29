import { RunFunction } from '../../interfaces/Command';
// @ts-ignore
import weky from 'weky'

export const name = 'guessthepokemon'
export const category = 'games'
export const description = 'Guess the Pokemon'

export const run: RunFunction = async (client, message, args) => {
    await weky.GuessThePokemon({
        message: message,
        embed: {
            title: 'Guess The Pokémon | Falcon',
            description:
                '**Type:**\n{{type}}\n\n**Abilities:**\n{{abilities}}\n\nYou only have **{{time}}** to guess the pokémon.',
            color: '#7289da',
            timestamp: true,
        },
        thinkMessage: 'I am thinking',
        othersMessage: 'Only <@{{author}}> can use the buttons!',
        winMessage:
            'GG, It was a **{{answer}}**. You got it correct in **{{time}}**.',
        loseMessage: 'Better luck next time! It was a **{{answer}}**.',
        time: 60000,
        incorrectMessage: "No {{author}}! The pokémon isn't `{{answer}}`",
        buttonText: 'Cancel',
    });

}