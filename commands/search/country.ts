import Command from '../../constants/command';
import { default as axios } from 'axios'

const CountryCommand: Command = {
    name: 'country',
    description: 'Peek at the information of a country!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get(`https://restcountries.eu/rest/v2/name/${args[0]}`).then((res) => {
            console.log(res.data)
        })
    },
}

export default CountryCommand;