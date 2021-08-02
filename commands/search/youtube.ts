import Command from '../../constants/command';

const YoutubeCommand: Command = {
    name: 'youtube',
    description: 'Watch Youtube in Discord',
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

export default YoutubeCommand;