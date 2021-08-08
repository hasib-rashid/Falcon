import Command from '../../constants/command';

const JumpCommand: Command = {
    name: 'jump',
    description: 'Jump from songs to song',
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
            client.distube.jump(message, parseInt(args[0]));
            message.channel.send(
                "**Successfully jumped to the song in queue!**"
            );
        } catch (err) {
            message.channel.send(
                "A unexpected Error Occured. Please make sure if you are in a voice channel and playing a music and if the problem still stays then join our support server in `info` command or report with `bug` command."
            );
        }
    },
}

export default JumpCommand;