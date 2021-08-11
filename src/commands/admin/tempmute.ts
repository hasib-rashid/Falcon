import { MessageEmbed } from 'discord.js';
import Command from '../../typings/command';
// @ts-ignore
import ms from 'ms'
import MuteUser from '../../models/MuteUser'

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
        if (!message.member?.permissions.has('MANAGE_MESSAGES')) return message.channel.send('**You need `MANAGE_MESSAGES` permission to use this command**')
        const Member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

        const time = args[1]

        MuteUser.create({ userID: Member?.id, guildID: message.guild?.id, time: time })

        if (!Member) return message.channel.send('**Member is not found.**')
        if (!time) return message.channel.send('**Please specify a time.**')
        const role = message.guild?.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if (!role) {
            try {
                let muterole = await message.guild?.roles.create({ name: 'muted', permissions: [] });
                message.guild?.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel, id) => {
                    // @ts-ignore
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild?.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        // @ts-ignore
        if (Member.roles.cache.has(role2?.id)) return message.channel.send(`**${Member.displayName} has already been muted.**`)
        // @ts-ignore
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} is now muted.`)

        // @ts-ignore
        MuteUser.findOne({ where: { userID: Member?.id, guildID: message.guild?.id } }).then((response, error) => {
            setTimeout(async () => {
                // @ts-ignore
                await Member.roles.remove(role2)
                message.channel.send(`**${Member.displayName} is now unmuted.**`)


                MuteUser.destroy({ where: { userID: Member?.id, guildID: message.guild?.id } })
                // @ts-ignore
            }, ms(response.dataValues.time))
        })

    },
}

export default TempMuteCommand;