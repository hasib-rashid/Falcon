import Command from '../../constants/command';

const BookCommand: Command = {
    name: 'book',
    description: 'Find any books at this spot!',
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

export default BookCommand;