import { RunFunction } from '../../interfaces/Command';

export const name = 'addrelatedvideo'
export const category = 'music'
export const description = 'Add a related Video'

export const run: RunFunction = async (client, message, args) => {
    try {
        client.distube.addRelatedVideo(message);
    } catch (err) {
        message.channel.send("**You are not in a voice channel!**");
    }
}