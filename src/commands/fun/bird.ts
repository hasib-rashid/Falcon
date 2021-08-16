import { RunFunction } from '../../interfaces/Command';
import { default as axios } from 'axios'

export const name = 'bird'
export const category = 'general'
export const description = 'Look at a picture of a bird'

export const run: RunFunction = async (client, message, args) => {
    axios.get("https://some-random-api.ml/img/birb").then((res) => {
        message.channel.send(res.data.link)
    })
}