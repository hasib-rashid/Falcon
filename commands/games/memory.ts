import Command from '../../constants/command';
import { stripIndents } from 'common-tags'
const directions = ['up', 'down', 'left', 'right'];
const colors = ['red', 'blue', 'green', 'yellow'];
const fruits = ['apple', 'orange', 'pear', 'banana'];

const queue2 = new Map();
const queue3 = new Map();
const queue = new Map();
const games = new Map()

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
        if (!args[0]) return message.channel.send('**How Many Directions Do You Want To Have To Memorize?**');
        let level: any = args[0];

        if (level < 1 || level > 20) return message.channel.send('**You Can Only Select Between 1 - 20!**');
        const current = ops.games.get(message.channel.id);
        if (current) return message.channel.send(`**Please Wait Until The Current Game of \`${current.name}\` is Finished!**`);
        ops.games.set(message.channel.id, { name: 'memory' });
        try {
            const memorize = genArray(level);
            const memorizeDisplay = memorize.map(word => `\`${word.toUpperCase()}\``).join(' ');
            const memorizemessage = await message.channel.send(stripIndents`
				**You Have 10 Seconds To Memorize -**
				${memorizeDisplay}
			`);
            await delay(10000);
            await memorizemessage.edit('**Type What You Saw, Just The Words!**');
            const memorizeType = memorize.join(' ');
            const messages = await message.channel.awaitMessages(res => message.author.id === res.author.id, {
                max: 1,
                time: 30000
            });
            ops.games.delete(message.channel.id);
            if (!messages.size) return message.channel.send(`**Time Uup! It Was ${memorizeDisplay}!**`);
            const answer = messages.first().content.toLowerCase();
            if (answer !== memorizeType) return message.channel.send(`**You Typed It Wrong, It Was ${memorizeDisplay}!**`);
            return message.channel.send('**You Won!**');
        } catch (err) {
            ops.games.delete(message.channel.id);
            throw err;
        };
        function genArray(level) {
            const sourceArr = [colors, directions, fruits][Math.floor(Math.random() * 3)];
            const arr = [];
            for (let i = 0; i < level; i++) arr.push(sourceArr[Math.floor(Math.random() * sourceArr.length)]);
            return arr;
        };
    },
}

export default MemoryCommand;