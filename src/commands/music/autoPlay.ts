import Command from '../../constants/command';

const ToggleAutoPlayCommand: Command = {
    name: 'autoplay',
    description: 'Toggle AutoPlay of the queue',
    aliases: [
        'toggle-autoplay', 'toggleautoplay', 'auto-play'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            client.distube.toggleAutoplay(message);
            message.channel.send("**Toggled the Autoplay!**");
        } catch (err) {
            message.channel.send(
                "**Please make sure that you are in a voice channel and you are playing a music!**"
            );
        }
    },
}

export default ToggleAutoPlayCommand;