import Command from '../../typings/command';

const PlaySkipCommand: Command = {
    name: 'playskip',
    description: 'Play and skip a song',
    aliases: [
        'play-skip', 'ps'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            client.distube.playSkip(message);
        } catch (err) {
            message.channel.send("**You are not in a voice channel!**");
        }
    },
}

export default PlaySkipCommand;