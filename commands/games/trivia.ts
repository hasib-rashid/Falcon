import Command from '../../constants/command';
import { createCanvas } from 'canvas'
import { } from '../../util/functions'

const TriviaCommand: Command = {
    name: 'trivia',
    description: 'Play trivia in discord',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        
    },
}

export default TriviaCommand;