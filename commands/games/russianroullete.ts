import Command from '../../constants/command';
import { shuffle, verify } from "../../util/functions.js"
import { oneLine, stripIndents } from "common-tags"

const RussianRoullete: Command = {
    name: 'russianroullete',
    description: 'Play russianroullete in discord',
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

export default RussianRoullete;