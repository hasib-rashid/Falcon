import Command from '../../constants/command';

const LoopCommand: Command = {
    name: 'loop',
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
            client.distube(message)
            message.channel.send("**Successfully Looped the current Queue!**");
        } catch (err) {
            message.channel.send(
                "**Either you are not in a voice channel or a song is not playing or the song is not paused**"
            );
        }
    },
}

export default LoopCommand;