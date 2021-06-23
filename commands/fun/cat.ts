import Command from '../../constants/command';

const CatCommand: Command = {
    name: 'cat',
    description: 'Watch the images of some Cats',
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

export default CatCommand;