import Command from '../../constants/command';

const FastTypeCommand: Command = {
    name: 'fasttype',
    description: 'Type a sentence Fast and Furious',
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

export default FastTypeCommand;