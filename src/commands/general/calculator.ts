import Command from '../../typings/command';
import { MessageEmbed } from 'discord.js'

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
        
    },
}

export default MathCommand;