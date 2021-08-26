import { RunFunction } from '../../interfaces/Command';

export const name = 'volume'
export const category = 'music'
export const description = 'Set the Volume of the Song'

export const run: RunFunction = async (client, message, args) => {
    try {
        client.distube.setVolume(message, args[0]);
        message.channel.send(`**Volume set to \`${args[0]}\`!**`);
    } catch (err) {
        message.channel.send("**An unexpected Error Occured**");
    }
}