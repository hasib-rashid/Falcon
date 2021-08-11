import Command from '../../constants/command';

const ShuffleCommand: Command = {
    name: 'shuffle',
    description: 'Shuffle the Guilds Queue',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            client.distube.shuffle(message)
            message.channel.send("**Successfully Shuffled the Queue!**");
        } catch (err) {
            message.channel.send(
                "**Either you are not in a voice channel or a song is not playing or the song is not paused**"
            );
        }
    },
}

export default ShuffleCommand;