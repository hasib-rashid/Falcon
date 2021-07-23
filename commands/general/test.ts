import { MessageEmbed } from 'discord.js';
import Command from '../../constants/command';

const TestCommand: Command = {
    name: 'test',
    description: 'This is for test only',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        client.guilds.cache.map((ev) => {
            ev.members.cache.map((member) => {
                // @ts-ignore
                if (member.roles.cache.has(ev?.roles.cache.find(r => r.name.toLowerCase() === 'muted')?.id)) {
                    console.log(`**${member.displayName} is currently Muted**`)
                }
            })
        })
    },
}

export default TestCommand;