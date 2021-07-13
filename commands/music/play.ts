import Command from '../../constants/command';

const PlayCommand: Command = {
    name: 'play',
    description: 'Play a music in Falcon',
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

export default PlayCommand;