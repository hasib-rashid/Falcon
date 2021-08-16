import { RunFunction } from '../../interfaces/Command';

export const name = 'loop'
export const category = 'music'
export const description = 'Loop through a music'

export const run: RunFunction = async (client, message, args) => {
    try {
        client.distube(message)
        message.channel.send("**Successfully Looped the current Queue!**");
    } catch (err) {
        message.channel.send(
            "**Either you are not in a voice channel or a song is not playing or the song is not paused**"
        );
    }
}