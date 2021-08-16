import { RunFunction } from '../../interfaces/Command';

export const name = 'play'
export const category = 'music'
export const description = 'Play a song'

export const run: RunFunction = async (client, message, args) => {
    try {
        if (!args)
            return message.channel.send(
                "**Please sepcify which song do i play!**"
            );

        message.channel.send(
            "<:youtube:864559346137956402> **Searching** :mag_right: `" +
            `${args.join(" ")}` +
            "`"
        );

        client.distube.play(message, args.join(" "));
    } catch (err) {
        message.channel.send("**You have to be in a voice channel to use this command**")
    }
}