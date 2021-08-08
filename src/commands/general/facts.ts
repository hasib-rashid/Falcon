import Command from '../../constants/command';
import { default as axios } from 'axios'

const FactsCommand: Command = {
    name: 'fact',
    description: 'Get a random fact!',
    aliases: [
        'facts'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get("https://uselessfacts.jsph.pl/random.json?language=en").then((response) => {
            message.channel.send(`**${response.data.text}**`)
        })
    },
}

export default FactsCommand;