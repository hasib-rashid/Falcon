import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'membercount'
export const category = 'general'
export const description = 'Count the Members in a guild'

export const run: RunFunction = async (client, message, args) => {
    const embed = new MessageEmbed()
        .setAuthor(message.guild?.name, message.guild?.iconURL() || "https://media.pocketgamer.biz/2021/5/110514/discord-new-logo-2021-r225x.jpg")
        .setTitle("Number of Users: " + message.guild?.memberCount)
        .setColor("BLUE");

    message.channel.send({ embeds: [embed] });
}