import { MessageActionRow, MessageButton } from 'discord-buttons';
import { MessageEmbed } from 'discord.js';
import Command from '../../constants/command';

const KickCommand: Command = {
    name: 'kick',
    description: 'Kick someone from the server',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.author) return;

        if (!message.member?.hasPermission("KICK_MEMBERS"))
            return message.channel.send(
                "**You need `KICK_MEMBERS` permission to use this command**"
            );

        const kickReason = args.slice(1).join(' ') || "No Reason";

        const targetUser = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

        // @ts-ignore
        if (!message.guild?.member(targetUser)?.kickable) return message.channel.send("**Could not kick this user due to role hierchy**");

        if (targetUser?.id === client.user?.id) return message.channel.send("**<:Bruh:862681013946810388> Seriously Dude....**")
        if (targetUser?.id === message.author?.id) return message.channel.send("**Haha Very Funny**")

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

        message.channel.send(confirmEmbed, row)

        client.on('clickButton', async (button) => {
            if (button.id === "kick-yes") {
                if (!button.message.author) return;

                targetUser?.kick()

                message.channel.send(`**Successfully Kicked ${targetUser} from this server.**`)

                const kickEmbed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTitle(`Kicked from ${message.guild?.name}`)
                    .setDescription(`**${message.author} Has Kicked you from ${message.guild?.name} for \`${kickReason}\`.**`)
                    .setColor("#ed3737")
                    .setFooter(client.user?.username, client.user?.displayAvatarURL())

                targetUser?.send(kickEmbed).catch((err) => { message.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })
            }

            if (button.id === "kick-no") {
                if (!button.message.author) return;

                button.message.channel.send("**Canceled The Action.**")
            }
        });
    },
}

export default KickCommand;