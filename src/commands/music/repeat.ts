import Command from '../../constants/command';

const RepeatCommand: Command = {
    name: 'repeat',
    description: 'Repeat a Song',
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
            client.distube.setRepeatMode(message, args[0]);
            message.channel.send("**Repeat Mode Successfully made!**");
        } catch (err) {
            message.channel.send(
                "**An unexpected Error occured. Please make the command again or contact us**"
            );
        }
    },
}

export default RepeatCommand;