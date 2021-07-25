import Command from '../../constants/command';

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

    },
}

export default GTPCommand;