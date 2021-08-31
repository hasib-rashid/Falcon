import { RunFunction } from '../../interfaces/Command';

export const name = 'resume'
export const category = 'music'
export const description = 'Resume a paused Song'

export const run: RunFunction = async (client, message, args) => {
    try {
        client.distube.resume(message)
        message.channel.send("**Successfully Resumed the current song!**");
    } catch (err) {
        message.channel.send(
            "**Either you are not in a voice channel or a song is not playing or the song is not paused**"
        );
    }
}