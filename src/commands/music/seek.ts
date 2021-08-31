import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { delay } from '../../util/functions';

export const name = 'seek'
export const category = 'music'
export const description = 'Move to a part of the queue'

export const run: RunFunction = async (client, message, args) => {
    try {
        if (!args) {
            message.channel.send(
                ":no_entry: **Please specify where will I move the song to in seconds?**"
            );
        }

        // @ts-ignore
        await client.distube.seek(message, Number(args[0] * 1000));
        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle("Seeked")
            .setColor("BLUE")
            .setDescription(`Seeked the song to \`${args[0]} seconds\``)

        message.channel.send({ embeds: [embed] })

        await delay(5000);
        //@ts-ignore
        await message.channel.bulkDelete(2);
        return;
    } catch (err) {
        message.channel.send(
            "**You are not in a voice channel or a song isnt playing!**"
        );
    }
}