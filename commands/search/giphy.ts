import dotenv from 'dotenv'
dotenv.config()

import Command from '../../constants/command';
import { default as axios } from 'axios'

const GiphyCommand: Command = {
    name: 'giphy',
    description: 'Search GIF in Giphy',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        //@ts-ignore
        axios.get("http://api.giphy.com/v1/gifs/search", { params: { q: args.join(""), api_key: process.env.GIPHY_API_KEY, rating: message.channel.nsfw ? "r" : "pg" } }).then(() => {

        })
    },
}

export default GiphyCommand;