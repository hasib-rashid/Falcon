import dotenv from 'dotenv'
dotenv.config()

import { MessageEmbed, PermissionResolvable } from 'discord.js';
import ms from 'ms';
import { RunFunction } from '../../interfaces/Command';
import { Deta } from 'deta'

const deta = Deta(process.env.DB)
const db = deta.Base("muted")

export const name = 'tempmute'
export const category = 'admin'
export const description = 'Temporarily mute someone'
export const userPermissions: PermissionResolvable = "MANAGE_CHANNELS"

export const run: RunFunction = async (client, message, args) => {
    const Member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])
    const muteReason = args.slice(2).join(' ') || "No Reason";

    const time = args[1]

    db.put({ userID: Member?.id, guildID: message.guild?.id, time: time })

    const muteTime = await db.fetch({ userID: Member.id })

    if (!Member) return message.channel.send('**Member is not found.**')
    if (!time) return message.channel.send('**Please specify a time.**')
    const role = message.guild?.roles.cache.find(role => role.name.toLowerCase() === 'muted')
    if (!role) {
        try {
            let muterole = await message.guild?.roles.create({
                name: 'muted',
                permissions: []
            });
            message.guild?.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel, id) => {
                await console.log(channel)
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

    Member?.send({ embeds: [tempMuteEmbed] }).catch((err) => { message.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })

    setTimeout(async () => {
        await Member.roles.remove(role2)
        message.channel.send(`**${Member.displayName} is now unmuted.**`)
        const unmuteEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle(`Unmuted from ${message.guild?.name}`)
            .setDescription(`**I have unmuted you from ${message.guild?.name} after \`${ms(ms(muteTime.items[0].time as string), { long: true })}\` of your punishment.**`)
            .setColor("#41d16a")
            .setFooter(client.user?.username, client.user?.displayAvatarURL())

        db.delete((muteTime.items[0].key as any))

        Member?.send({ embeds: [unmuteEmbed] }).catch((err) => { message.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })

    }, ms(time))
}