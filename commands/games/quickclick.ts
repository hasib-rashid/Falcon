import Command from '../../constants/command';
// @ts-ignore
import weky from 'weky'

const QuickClickCommand: Command = {
    name: 'quickclick',
    description: 'Quickly Click the button',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        await weky.QuickClick({
            message: message,
            embed: {
                title: 'Quick Click | Falcon',
                color: 'BLUE',
                timestamp: true,
            },
            time: 60000,
            waitMessage: '**The buttons may appear anytime now!**',
            startMessage:
                '**First person to press the correct button will win. You have ***{{time}}***!**',
            winMessage: '**GG, <@{{winner}}> pressed the button in **{{time}} seconds***.**',
            loseMessage: '**No one pressed the button in time. So, I dropped the game!**',
            emoji: '👆',
            ongoingMessage:
                "**A game is already runnning in <#{{channel}}>. You can't start a new one!**",
        });
    },
}

export default QuickClickCommand;