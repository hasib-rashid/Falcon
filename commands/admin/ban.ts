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

        const targetUser = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

        const confirmEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle("Banning A User")
            .setColor("#ff2424")
            .setDescription(`**Are you sure you want to ban  ${targetUser}\n\nReason:  \`${args.join(" ")}\`\n\n This Action is irreversable.\n\n React with ✅ if you want to ban this user. And react with ❌ if you want to cancel this request.\n You have 30 seconds to apply the command.**`)
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
    },
}

export default BanCommand;