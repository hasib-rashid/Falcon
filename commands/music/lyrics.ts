import Command from '../../constants/command';

const LyricsCommand: Command = {
    name: 'lyrics',
    description: 'Look at the lyrics of Falcon',
    aliases: [
        'lyric'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {

    },
}

export default LyricsCommand;