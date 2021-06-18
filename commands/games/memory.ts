import Command from '../../constants/command';
import { stripIndents } from 'common-tags'
const directions = ['up', 'down', 'left', 'right'];
const colors = ['red', 'blue', 'green', 'yellow'];
const fruits = ['apple', 'orange', 'pear', 'banana'];

const MemoryCommand: Command = {
    name: 'memory',
    description: 'Memories Bring back Memories feel like you',
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

export default MemoryCommand;