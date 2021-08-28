import { MessageEmbed, PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'mute'
export const category = 'admin'
export const description = 'Mute someone'
export const userPermissions: PermissionResolvable = "MANAGE_GUILD"

export const run: RunFunction = async (client, message, args) => {
    const muteReason = args.slice(1).join(' ') || "No Reason";

    if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('**You need `MANAGE_MESSAGES` permission to use this command**')
    const Member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])
    if (!Member) return message.channel.send('Member is not found.')
    const role = message.guild?.roles.cache.find(role => role.name.toLowerCase() === 'muted')
    if (!role) {
        try {
            let muterole = await message.guild?.roles.create({
                name: 'muted',
                permissions: []
            });
            message.guild?.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel, id) => {
                await console.log(channel.name)
            });
        } catch (error) {
            console.log(error)
        }
    };
    let role2 = message.guild?.roles.cache.find(r => r.name.toLowerCase() === 'muted')
    // @ts-ignore
    if (Member.roles.cache.has(role2?.id)) return message.channel.send(`**${Member} has already been muted.**`)
    // @ts-ignore
    await Member.roles.add(role2)
    message.channel.send(`**${Member} was successfully muted.**`)

    const muteEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`Muted from ${message.guild?.name}`)
        .setDescription(`**${message.author} Has Muted you from ${message.guild?.name} for \`${muteReason}\`. Please contact him if you want to get unmuted.**`)
        .setColor("#ed3737")
        .setFooter(client.user?.username, client.user?.displayAvatarURL())

    Member?.send({ embeds: [muteEmbed] }).catch((err) => { message.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })
}