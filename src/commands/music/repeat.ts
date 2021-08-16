import { RunFunction } from '../../interfaces/Command';

export const name = 'repeat'
export const category = 'music'
export const description = 'Repeat a song'

export const run: RunFunction = async (client, message, args) => {
    try {
        client.distube.setRepeatMode(message, args[0]);
        message.channel.send("**Repeat Mode Successfully made!**");
    } catch (err) {
        message.channel.send(
            "**An unexpected Error occured. Please make the command again or contact us**"
        );
    }
}