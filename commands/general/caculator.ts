import Command from '../../constants/command';
require("@weky/inlinereply")
import { MessageEmbed } from 'discord.js'
// @ts-ignore
import weky from 'weky'
import { evaluate } from 'mathjs'

const MathCommand: Command = {
    name: 'calculator',
    description: 'Calculate anything with a Calculator',
    aliases: [
        'calculate', 'calc'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            await weky.Calculator({
                message: message,
                embed: {
                    title: 'Calculator | Falcon',
                    color: '#3982f7',
                    timestamp: true
                },
                disabledQuery: 'Calculator is disabled!',
                invalidQuery: 'The provided equation is invalid!',
                othersMessage: 'Only <@{{author}}> can use the buttons!'
            });
        } catch (err) {
            console.error(err)
            message.channel.send("**There has been a error. Please try again with a valid math logic**")
        }
    },
}

export default MathCommand;