import { RunFunction } from '../../interfaces/Command';
import { default as axios } from 'axios'

export const name = 'panda'
export const category = 'fun'
export const description = 'Watch an image of a panda'

export const run: RunFunction = async (client, message, args) => {
    axios.get("https://some-random-api.ml/img/panda").then((res) => {
        message.channel.send(res.data.link)
    })
}