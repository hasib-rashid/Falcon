import Command from '../../typings/command';
// @ts-ignore
import weky from 'weky'

const GTPCommand: Command = {
    name: 'guessthepokemon',
    description: 'Just Guess the Pokemon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
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

    },
}

export default GTPCommand;