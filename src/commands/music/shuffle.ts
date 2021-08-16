import { RunFunction } from '../../interfaces/Command';

export const name = 'shuffle'
export const category = 'music'
export const description = 'Shuffle the queue'

export const run: RunFunction = async (client, message, args) => {
    try {
        client.distube.shuffle(message)
        message.channel.send("**Successfully Shuffled the Queue!**");
    } catch (err) {
        message.channel.send(
            "**Either you are not in a voice channel or a song is not playing or the song is not paused**"
        );
    }
}