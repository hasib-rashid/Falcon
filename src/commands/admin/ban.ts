import { Message, GuildMember, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed, PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'ban'
export const category = 'admin'
export const description = 'Ban a User'
export const userPermissions: PermissionResolvable = "BAN_MEMBERS"

export const run: RunFunction = async (client, message, args) => {
    if (!message.author) return;

    if (!message.member.permissions.has("BAN_MEMBERS"))
        return message.channel.send(
            "**You need `BAN_MEMBERS` permission to use this command**"
        );

    const banReason = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No Reason";

    const targetUser = message.mentions.
        members?.first() || message.guild?.members.cache.get(args[0])

    // @ts-ignore
    if (!message.guild?.member(targetUser)?.bannable) return message.channel.send("**Could not ban this user due to role hierchy**");

    if (targetUser?.id === client.user?.id) return message.channel.send("**<:Bruh:862681013946810388> Seriously Dude....**")
    if (targetUser?.id === message.author?.id) return message.channel.send("**Haha Very Funny**")

    const confirmEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle("Banning A User")
        .setColor("#ed3737")
        .setDescription(`**Are you sure you want to ban  ${targetUser} for \`${banReason}\`**`)
        .setFooter(message.client.user?.username, message.client.user?.displayAvatarURL())

    const confirmButton = new MessageButton()
        .setCustomId("ban-yes")
        .setLabel("Yes")
        .setStyle("SUCCESS")

    const denyButton = new MessageButton()
        .setCustomId("ban-no")
        .setLabel("No")
        .setStyle("DANGER")

    const row = new MessageActionRow()
        .addComponents(confirmButton, denyButton)

    const banYesFilter = (i: MessageComponentInteraction) => i.customId === 'ban-yes'
    const banYesCollector = message.channel.createMessageComponentCollector({ filter: banYesFilter, time: 30000 });

    const banNoFilter = (i: MessageComponentInteraction) => i.customId === 'ban-no'
    const banNoCollector = message.channel.createMessageComponentCollector({ filter: banNoFilter, time: 30000 });

    message.reply({ embeds: [confirmEmbed], components: [row] })

    banYesCollector.on('collect', async (i: MessageComponentInteraction) => {
        if (i.customId === 'ban-yes') {
            if (i.user.id !== message.author.id) {
                i.reply({ content: "**You did not send this command. So you cannot use it unless you send the command yourself**", ephemeral: true })
            } else {
                message.edit({ content: `**Successfully Banned ${targetUser} for \`${banReason}\`**`, embeds: [], components: [] })

                const banEmbed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTitle(`Banned from ${message.guild?.name}`)
                    .setDescription(`**${message.author} Has Banned you from ${message.guild?.name} for \`${banReason}\`. Please contact him if you want to get unbanned.**`)
                    .setColor("#ed3737")
                    .setFooter(client.user?.username, client.user?.displayAvatarURL())

                await targetUser?.send({ embeds: [banEmbed] }).catch((err) => { i.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })
                // targetUser.ban({ reason: `${banReason}` })
            }
        }
    });

    banNoCollector.on('collect', async (i: MessageComponentInteraction) => {
        if (i.customId === 'ban-no') {
            if (i.user.id !== message.author.id) {
                i.reply({ content: "**You did not send this command. So you cannot use it unless you send the command yourself**", ephemeral: true })
            } else {
                message.reply({ content: "**Cancelled the action**", components: [] })
            }
        }
    });

    return;
}