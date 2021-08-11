import Command from '../../typings/command';
// @ts-ignore
import weky from 'weky'

const LieSwatterCommand: Command = {
    name: 'lieswatter',
    description: 'Swat a Lie',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        await weky.LieSwatter({
            message: message,
            embed: {
                title: 'Lie Swatter | Falcon',
                color: 'BLUE',
                timestamp: true,
            },
            thinkMessage: 'I am thinking',
            winMessage:
                '**GG, It was a **{{answer}}**. You got it correct in *{{time}}*.**',
            loseMessage: '**Better luck next time! It was a *{{answer}}*.**',
            othersMessage: '**Only <@{{author}}> can use the buttons!**',
            buttons: { true: 'Truth', lie: 'Lie' },
        });
    },
}

export default LieSwatterCommand;