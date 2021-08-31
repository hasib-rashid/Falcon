import { RunFunction } from '../../interfaces/Command';

export const name = 'pause'
export const category = 'music'
export const description = 'Pause a Music'

export const run: RunFunction = async (client, message, args) => {
    try {
        client.distube.pause(message)
        message.channel.send("**Successfully Paused the current song!**");
    } catch (err) {
        message.channel.send(
            "**Either you are not in a voice channel or a song is not playing**"
        );
    }
}