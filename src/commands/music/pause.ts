import Command from '../../constants/command';

const PauseCommand: Command = {
    name: 'pause',
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
            client.distube.pause(message)
            message.channel.send("**Successfully Paused the current song!**");
        } catch (err) {
            message.channel.send(
                "**Either you are not in a voice channel or a song is not playing**"
            );
        }
    },
}

export default PauseCommand;