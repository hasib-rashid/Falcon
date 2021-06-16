import Command from '../../constants/command';
import { stripIndents } from 'common-tags'
import { shuffle } from '../../util/Util'
import { default as axios } from 'axios'
const choices = ['A', 'B', 'C', 'D'];

const TriviaCommand: Command = {
    name: 'trivia',
    description: 'Play trivia in discord',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {

    },
}

export default TriviaCommand;