import { Message, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed, PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'kick'
export const category = 'admin'
export const description = 'Kick someone'
export const userPermissions: PermissionResolvable = "KICK_MEMBERS"

export const run: RunFunction = async (client, message, args) => {
    if (!message.author) return;

    if (!message.member.permissions.has("KICK_MEMBERS"))
        return message.channel.send(
            "**You need `KICK_MEMBERS` permission to use this command**"
        );

    const kickReason = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No Reason";

    const targetUser = message.mentions.
        members?.first() || message.guild?.members.cache.get(args[0])

    // @ts-ignore
    if (!message.guild?.member(targetUser)?.bannable) return message.channel.send("**Could not kick this user due to role hierchy**");

    if (targetUser?.id === client.user?.id) return message.channel.send("**<:Bruh:862681013946810388> Seriously Dude....**")
    if (targetUser?.id === message.author?.id) return message.channel.send("**Haha Very Funny**")

    const confirmEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle("Kicking A User")
        .setColor("#ed3737")
        .setDescription(`**Are you sure you want to kick  ${targetUser} for \`${kickReason}\`**`)
        .setFooter(message.client.user?.username, message.client.user?.displayAvatarURL())

    const confirmButton = new MessageButton()
        .setCustomId("kick-yes")
        .setLabel("Yes")
        .setStyle("SUCCESS")

    const denyButton = new MessageButton()
        .setCustomId("kick-no")
        .setLabel("No")
        .setStyle("DANGER")

    const row = new MessageActionRow()
        .addComponents(confirmButton, denyButton)

    const kickYesFilter = (i: MessageComponentInteraction) => i.customId === 'kick-yes'
    const kickYesCollector = message.channel.createMessageComponentCollector({ filter: kickYesFilter, time: 30000 });

    const kickNoFilter = (i: MessageComponentInteraction) => i.customId === 'kick-no'
    const kickNoCollector = message.channel.createMessageComponentCollector({ filter: kickNoFilter, time: 30000 });

    message.reply({ embeds: [confirmEmbed], components: [row] })

    kickYesCollector.on('collect', async (i: MessageComponentInteraction) => {
        if (i.customId === 'kick-yes') {
            if (i.user.id !== message.author.id) {
                i.reply({ content: "**You did not send this command. So you cannot use it unless you send the command yourself**", ephemeral: true })
            } else {
                message.edit({ content: `**Successfully Kicked ${targetUser} for \`${kickReason}\`**`, embeds: [], components: [] })

                const kickEmbed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTitle(`Kicked from ${message.guild?.name}`)
                    .setDescription(`**${message.author} Has Kicked you from ${message.guild?.name} for \`${kickReason}\`.**`)
                    .setColor("#ed3737")
                    .setFooter(client.user?.username, client.user?.displayAvatarURL())

                await targetUser?.send({ embeds: [kickEmbed] }).catch((err) => { i.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })
                // targetUser.kick()
            }
        }
    });

    kickNoCollector.on('collect', async (i: MessageComponentInteraction) => {
        if (i.customId === 'kick-no') {
            if (i.user.id !== message.author.id) {
                i.reply({ content: "**You did not send this command. So you cannot use it unless you send the command yourself**", ephemeral: true })
            } else {
                message.reply({ content: "**Cancelled the action**", components: [] })
            }
        }
    });

    return;
}