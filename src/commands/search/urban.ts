import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { formatNumber, shorten } from '../../util/functions';

export const name = 'urban'
export const category = 'search'
export const description = 'Search meanings in Urban'

export const run: RunFunction = async (client, message, args) => {
    try {
        axios.get(`http://api.urbandictionary.com/v0/define?term=${args[0]}`).then((res) => {
            const { data } = res

            if (!data.list.length)
                return message.channel.send("Could not find any results.");
            const dataWord = data.list[0];
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setAuthor(
                    "Urban Dictionary",
                    "https://i.imgur.com/Fo0nRTe.png",
                    "https://www.urbandictionary.com/"
                )
                .setURL(dataWord.permalink)
                .setTitle(dataWord.word)
                .setDescription(shorten(dataWord.definition.replace(/\[|\]/g, "")))
                .setFooter(
                    `👍 ${formatNumber(dataWord.thumbs_up)} 👎 ${formatNumber(
                        dataWord.thumbs_down
                    )}`
                )
                .setTimestamp(new Date(dataWord.written_on))
                .addField(
                    "❯ Example",
                    dataWord.example
                        ? shorten(dataWord.example.replace(/\[|\]/g, ""), 1000)
                        : "None"
                );
            return message.channel.send({ embeds: [embed] });
        })

    } catch (err) {
        console.error(err);
    }
}