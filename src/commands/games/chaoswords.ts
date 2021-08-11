import Command from '../../typings/command';
// @ts-ignore
import weky from 'weky'

const ChaosWordsCommand: Command = {
    name: 'chaoswords',
    description: 'Chaos words. Am I right? .....',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        await weky.ChaosWords({
            message: message,
            embed: {
                title: 'ChaosWords | Falcon',
                description: '**You have *{{time}}* to find the hidden words in the below sentence.**',
                color: 'BLUE',
                field1: 'Sentence:',
                field2: 'Words Found/Remaining Words:',
                field3: 'Words found:',
                field4: 'Words:',
                timestamp: true
            },
            winMessage: '**GG, You won! You made it in *{{time}}*.**',
            loseMessage: '**Better luck next time!**',
            wrongWordMessage: '**Wrong Guess! You have *{{remaining_tries}}* tries left.**',
            correctWordMessage: '**GG, *{{word}}* was correct! You have to find *{{remaining}}* more word(s).**',
            time: 60000,
            words: ['hello', 'these', 'are', 'words'],
            charGenerated: 17,
            maxTries: 10,
            buttonText: 'Cancel',
            othersMessage: 'Only <@{{author}}> can use the buttons!'
        });
    },
}

export default ChaosWordsCommand;