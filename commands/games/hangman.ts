import { Message } from 'discord.js';
import Command from '../../constants/command';
import { hangman } from './hangmanUtils'

const HangmanCommand: Command = {
    name: 'hangman',
    description: 'Play hangman in discord',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const hang = new hangman({
            message: message
        })
    },
}

export default HangmanCommand;