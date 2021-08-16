import { RunFunction } from '../../interfaces/Command';
import { default as axios } from 'axios'

export const name = 'fox'
export const category = 'fun'
export const description = 'Watch the picture of a Fox'

export const run: RunFunction = async (client, message, args) => {
    axios.get("https://some-random-api.ml/img/fox").then((res) => {
        message.channel.send(res.data.link)
    })
}