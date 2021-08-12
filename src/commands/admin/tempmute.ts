import { MessageEmbed } from 'discord.js';
import Command from '../../typings/command';
import ms from 'ms'
import { Deta } from 'deta'
import { ENV } from '../../classes/env';
const deta = Deta(ENV.db)
const db = deta.Base("muted")

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
        if (!message.member?.hasPermission('MANAGE_MESSAGES')) return message.channel.send('**You need `MANAGE_MESSAGES` permission to use this command**')
        const Member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])
        const muteReason = args.slice(1).join(' ') || "No Reason";

        const time = args[1]

        db.put({ userID: Member?.id, guildID: message.guild?.id, time: time })

        const muteTime = await db.fetch({ userID: Member.id })

        if (!Member) return message.channel.send('**Member is not found.**')
        if (!time) return message.channel.send('**Please specify a time.**')
        const role = message.guild?.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if (!role) {
            try {
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
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild?.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        
        if (Member.roles.cache.has(role2?.id)) return message.channel.send(`**${Member.displayName} has already been muted.**`)

        await Member.roles.add(role2)
        message.channel.send(`**${Member.displayName} is now muted.**`)

        const tempMuteEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle(`Muted from ${message.guild?.name}`)
            .setDescription(`**${message.author} Has Muted you temporarily for \`${ms(ms(time), { long: true })}\` from ${message.guild?.name} for \`${muteReason}\`. Please contact or dm him if you want to get unmuted.**`)
            .setColor("#ed3737")
            .setFooter(client.user?.username, client.user?.displayAvatarURL())

        Member?.send(tempMuteEmbed).catch((err) => { message.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send(`**${Member.displayName} is now unmuted.**`)

            console.log(muteTime.items[0].key as any)
            db.delete((muteTime.items[0].key as any))
        }, ms(time))
    },
}

export default TempMuteCommand;