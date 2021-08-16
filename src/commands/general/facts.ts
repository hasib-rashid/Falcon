import { RunFunction } from '../../interfaces/Command'; 
import { default as axios } from 'axios'

export const name = 'facts'
export const category = 'general'
export const description = 'Just check a random Fact'
export const aliases = ["fact"]

export const run: RunFunction = async (client, message, args) => {
    axios.get("https://uselessfacts.jsph.pl/random.json?language=en").then((response) => {
        message.channel.send(`**${response.data.text}**`)
    })
}