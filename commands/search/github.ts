import Command from '../../constants/command';
import { default as axios } from 'axios'
import moment from 'moment'

const GithubCommand: Command = {
    name: 'github',
    description: 'Check anyones github with this command',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!args[1]) {
            axios.get(`https://api.github.com/users/${args[0]}`).then(function (response) {

            })
        }
    },
}

export default GithubCommand;