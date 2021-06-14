import Command from '../../constants/command';

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

    },
}

export default HangmanCommand;