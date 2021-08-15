import { RunFunction } from '../../interfaces/Command';

export const name = 'autoplay'
export const category = 'music'
export const description = 'Toggle Autoplay'

export const run: RunFunction = async (client, message, args) => {
    try {
        client.distube.toggleAutoplay(message);
        message.channel.send("**Toggled the Autoplay!**");
    } catch (err) {
        message.channel.send(
            "**Please make sure that you are in a voice channel and you are playing a music!**"
        );
    }
}