import { RunFunction } from '../../interfaces/Command';

export const name = 'jump'
export const category = 'music'
export const description = 'Jump to a part of song'

export const run: RunFunction = async (client, message, args) => {
    try {
        client.distube.jump(message, parseInt(args[0]));
        message.channel.send(
            "**Successfully jumped to the song in queue!**"
        );
    } catch (err) {
        message.channel.send(
            "A unexpected Error Occured. Please make sure if you are in a voice channel and playing a music and if the problem still stays then join our support server in `info` command or report with `bug` command."
        );
    }
}