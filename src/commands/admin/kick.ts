import { MessageActionRow, MessageButton } from 'discord-buttons';
import { Message, MessageEmbed, PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'kick'
export const category = 'admin'
export const description = 'Kick someone'
export const userPermissions: PermissionResolvable = "KICK_MEMBERS"

export const run: RunFunction = async (client, message, args) => {
    if (!message.author) return;

    const kickReason = args.slice(1).join(' ') ? args.slice(1).join(' ') : "No Reason";

    const targetUser = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

    if (targetUser?.id === client.user?.id) return message.channel.send("**<:Bruh:862681013946810388> Seriously Dude....**")
    if (targetUser?.id === message.author?.id) return message.channel.send("**Haha Very Funny**")

    // @ts-ignore
    if (!message.guild?.member(targetUser)?.kickable) return message.channel.send("**Could not kick this user due to role hierchy**");

    const confirmEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle("Kicking A User")
        .setColor("#ed3737")
        .setDescription(`**Are you sure you want to kick  ${targetUser} for \`${kickReason}\`**`)
        .setFooter(message.client.user?.username, message.client.user?.displayAvatarURL())

    const confirmButton = new MessageButton()
        .setLabel("Yes")
        .setID("kick-yes")
        .setStyle("green");


    const denyButton = new MessageButton()
        .setLabel("No")
        .setID("kick-no")
        .setStyle("red");

    const row = new MessageActionRow()
        .addComponents(confirmButton, denyButton)

    const kickMessage = message.channel.send(confirmEmbed, row)

    client.on('clickButton', async (button) => {
        if (button.id === "kick-yes") {
            if (button.clicker.user.id !== message.author.id) return;

            kickMessage.then((msg: Message) => {
                msg.delete()
            })

            message.channel.send(`**Successfully Kicked ${targetUser} from this server.**`)

            const kickEmbed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle(`Kicked from ${message.guild?.name}`)
                .setDescription(`**${message.author} Has Kicked you from ${message.guild?.name} for \`${kickReason}\`.**`)
                .setColor("#ed3737")
                .setFooter(client.user?.username, client.user?.displayAvatarURL())

            await targetUser?.send(kickEmbed).catch((err) => { message.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })
            targetUser?.kick()
        }

        if (button.id === "kick-no") {
            if (button.clicker.user.id !== message.author.id) return;

            kickMessage.then((msg: Message) => {
                msg.delete()
            })

            button.message.channel.send("**Canceled The Action.**")
        }
    });
}