import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'discordjs'
export const category = 'search'
export const description = 'Search the docs of discord.js'

export const run: RunFunction = async (client, message, args) => {
    let version = args[1]

    if (!version) {
        version = "stable"
    }
    axios.get(`https://djsdocs.sorta.moe/v2/embed?src=${encodeURIComponent(version)}&q=${encodeURIComponent(args[0])}`).then((res) => {
        const embed = new MessageEmbed(res.data)
        message.channel.send(embed)
    })
}