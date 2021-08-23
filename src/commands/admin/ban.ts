import { MessageActionRow, MessageButton } from 'discord-buttons';
import { MessageEmbed, PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'ban'
export const category = 'admin'
export const description = 'Ban a User'
export const userPermissions: PermissionResolvable = "BAN_MEMBERS"

export const run: RunFunction = async (client, message, args) => {
    if (!message.author) return;

    if (!message.member?.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
            "**You need `BAN_MEMBERS` permission to use this command**"
        );

    const banReason = args.slice(1).join(' ') || "No Reason";

    const targetUser = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

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

    let confirmButton = new MessageButton()
        .setLabel("Yes")
        .setID("ban-yes")
        .setStyle("green");


    let denyButton = new MessageButton()
        .setLabel("No")
        .setID("ban-no")
        .setStyle("red");

    const row = new MessageActionRow()
        .addComponents(confirmButton, denyButton)

    const banMessage = await message.channel.send(confirmEmbed, row)

    client.on('clickButton', async (button) => {
        if (button.id === "ban-yes") {
            if (!button.message.author) return;

            targetUser?.ban({ reason: banReason }).then((btn) => {
                confirmButton.setDisabled()
                denyButton.setDisabled()
            })

            message.channel.send(`**Successfully Banned ${targetUser} from this server.**`)

            const banEmbed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle(`Banned from ${message.guild?.name}`)
                .setDescription(`**${message.author} Has Banned you from ${message.guild?.name} for \`${banReason}\`. Please contact him if you want to get unbanned.**`)
                .setColor("#ed3737")
                .setFooter(client.user?.username, client.user?.displayAvatarURL())

            targetUser?.send(banEmbed).catch((err) => { message.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })
        }

        if (button.id === "ban-no") {
            if (!button.message.author) return;

            button.message.channel.send("**Canceled The Action.**")
            confirmButton = confirmButton.setDisabled()
            denyButton = denyButton.setDisabled()

            button.message.edit(banMessage, confirmButton)
            button.message.edit(banMessage, denyButton)
        }
    })

    return;
}