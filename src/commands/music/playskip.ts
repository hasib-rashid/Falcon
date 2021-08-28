import { RunFunction } from '../../interfaces/Command';

export const name = 'playskip'
export const category = 'music'
export const description = 'Skip and Play a song simultaneously'

export const run: RunFunction = async (client, message, args) => {
    try {
        client.distube.playSkip(message);
    } catch (err) {
        message.channel.send("**You are not in a voice channel!**");
    }
}