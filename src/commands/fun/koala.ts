import { RunFunction } from '../../interfaces/Command';
import { default as axios } from 'axios'

export const name = 'koala'
export const category = 'fun'
export const description = 'Watch the picture of a Koala'

export const run: RunFunction = async (client, message, args) => {
    axios.get("https://some-random-api.ml/img/koala").then((res) => {
        message.channel.send(res.data.link)
    })
}