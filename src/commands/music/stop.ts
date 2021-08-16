import { RunFunction } from '../../interfaces/Command';

export const name = 'stop'
export const category = 'music'
export const description = 'Stops the song and leaves the voice channel'

export const run: RunFunction = async (client, message, args) => {
    try {
        client.distube.skip(message)
        message.channel.send("**Successfully Skipped the current song!**");
    } catch (err) {
        message.channel.send(
            "**Either you are not in a voice channel or a song is not playing.**"
        );
    }
}