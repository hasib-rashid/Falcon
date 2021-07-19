import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js';
import { MessageActionRow, MessageButton } from 'discord-buttons'

const BanCommand: Command = {
    name: 'ban',
    description: 'Ban someone in your server',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.hasPermission("BAN_MEMBERS"))
            return message.channel.send(
                "**You need `BAN_MEMBERS` permission to use this command**"
            );

        if (message.author.id === "839367177899737108") return message.channel.send("Imagine Dragons Deez Nutz right in your face.")


        const banReason = args.slice(1).join(' ') || "No Reason";

        const targetUser = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

        const confirmEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle("Banning A User")
            .setColor("#ed3737")
            .setDescription(`**Are you sure you want to ban  ${targetUser} for \`${banReason}\`**`)
            .setFooter(message.client.user?.username, message.client.user?.displayAvatarURL())

        const confirmButton = new MessageButton()
            .setLabel("Yes")
            .setID("ban-yes")
            .setStyle("green");


        const denyButton = new MessageButton()
            .setLabel("No")
            .setID("ban-no")
            .setStyle("red");

        const row = new MessageActionRow()
            .addComponents(confirmButton, denyButton)

        message.channel.send(confirmEmbed, row)

        client.on('clickButton', async (button) => {
            if (button.id === "ban-yes") {
                if (!button.message.author) return;

                button.message.channel.send("**Smulate Ban**")

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

                button.message.channel.send("**Smulate Cancel Ban**")
            }
        });
    },
}

export default BanCommand;