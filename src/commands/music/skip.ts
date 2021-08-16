import { RunFunction } from '../../interfaces/Command';

export const name = 'skip'
export const category = 'music'
export const description = 'Skip a song'

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