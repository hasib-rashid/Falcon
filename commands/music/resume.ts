import Command from '../../constants/command';

const ResumeCommand: Command = {
    name: 'resume',
    description: 'Pause a song in Falcon',
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
            client.distube.resume(message)
            message.channel.send("**Successfully Resumed the current song!**");
        } catch (err) {
            message.channel.send(
                "**Either you are not in a voice channel or a song is not playing or the song is not paused**"
            );
        }
    },
}

export default ResumeCommand;