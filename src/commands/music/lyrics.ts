import { RunFunction } from '../../interfaces/Command';
import lyrics from 'findthelyrics'
import { MessageEmbed } from 'discord.js';

export const name = 'lyrics'
export const category = 'music'
export const description = 'Find the lyrics of a song'

export const run: RunFunction = async (client, message, args) => {
    if (!args.join(" ")) return message.channel.send("**Please mention the song you want the lyrics of.**")
    lyrics.find(args.join(" "), function (err: Error, resp: any) {
        if (!err) {
            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle(args.join(" "))
                .setDescription(resp)
                .setColor("BLUE")

            message.channel.send(embed)
        } else {
            console.log(err)
        }
    });
}