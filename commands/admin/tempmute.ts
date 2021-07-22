import { MessageEmbed } from 'discord.js';
import Command from '../../constants/command';

const TempMuteCommand: Command = {
    name: 'tempmute',
    description: 'Temporarily Mute a Member',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permissions to use this command')
        const Member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])
        const input_time = args[1]

        if (!Member) return message.channel.send('Member is not found.')
        if (!input_time) return message.channel.send('Please specify a time.')
        const role = message.guild?.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if (!role) {
            try {
                message.channel.send('Muted role is not found, attempting to create muted role.')

                let muterole = await message.guild?.roles.create({
                    data: {
                        name: 'muted',
                        permissions: []
                    }
                });
                message.guild?.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    // @ts-ignore
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Muted role has sucessfully been created.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild?.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        // @ts-ignore
        if (Member.roles.cache.has(role2?.id)) return message.channel.send(`${Member.displayName} has already been muted.`)
        // @ts-ignore
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} is now muted.`)

        setTimeout(async () => {
            // @ts-ignore
            await Member.roles.remove(role2)
            message.channel.send(`${Member.displayName} is now unmuted`)
        }, +input_time)
    },
}

export default TempMuteCommand;