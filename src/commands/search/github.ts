import axios from 'axios';
import { TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'github'
export const category = 'search'
export const description = 'Search Github'

export const run: RunFunction = async (client, message, args) => {
    // @ts-ignore
    axios.get("http://api.giphy.com/v1/gifs/search", { params: { q: args.join(""), api_key: process.env.GIPHY_API_KEY, rating: message.channel.nsfw ? "r" : "pg" } }).then((res) => {
        if (!res.data.data.length)
            return message.channel.send("Could not find any results.");

        return message.channel.send(
            res.data.data[Math.floor(Math.random() * res.data.data.length)].images
                .original.url
        );
    })
}