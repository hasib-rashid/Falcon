import axios from 'axios';
import { RunFunction } from '../../interfaces/Command';

export const name = 'tenor'
export const category = 'search'
export const description = 'Search Tenor'

export const run: RunFunction = async (client, message, args) => {
    axios.get(`https://g.tenor.com/v1/search?q=${args.join(" ")}&key=LIVDSRZULELA&limit=8`).then((res) => {
        message.channel.send(res.data.results[Math.floor(Math.random() * res.data.results.length)].itemurl)
    })
}