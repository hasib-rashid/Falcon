import Command from '../../constants/command';
// @ts-ignore
import weky from 'weky'

const GTNCommand: Command = {
    name: 'guessthenumber',
    description: 'Guess the Number',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!args[0]) return message.channel.send("**Please Specify the minimum and the Maximum Number.**")
        if (!args[1]) return message.channel.send("**Please Specify the minimum and the Maximum Number.**")

        await weky.GuessTheNumber({
            message: message,
            embed: {
                title: 'Guess The Number | Falcon',
                description: '**You have *{{time}}* to guess the number.**',
                color: '#7289da',
                timestamp: true,
            },
            publicGame: true,
            number: Math.random() * (+args[1] - +args[0] + 1),
            time: 60000,
            winMessage: {
                publicGame:
                    'GG, The number which I guessed was **{{number}}**. <@{{winner}}> made it in **{{time}}**.\n\n__**Stats of the game:**__\n**Duration**: {{time}}\n**Number of participants**: {{totalparticipants}} Participants\n**Participants**: {{participants}}',
                privateGame:
                    'GG, The number which I guessed was **{{number}}**. You made it in **{{time}}**.',
            },
            loseMessage:
                'Better luck next time! The number which I guessed was **{{number}}**.',
            bigNumberMessage: 'No {{author}}! My number is greater than **{{number}}**.',
            smallNumberMessage:
                'No {{author}}! My number is smaller than **{{number}}**.',
            othersMessage: 'Only <@{{author}}> can use the buttons!',
            buttonText: 'Cancel',
            ongoingMessage:
                "A game is already runnning in <#{{channel}}>. You can't start a new one!",
            returnWinner: false,
        });

    },
}

export default GTNCommand;