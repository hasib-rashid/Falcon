import { MessageActionRow, MessageButton } from 'discord-buttons';
import { MessageEmbed } from 'discord.js';
import Command from '../../constants/command';

const MuteCommand: Command = {
    name: 'mute',
    description: 'Mute Someone from talking',
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

        if (!message.member?.hasPermission("BAN_MEMBERS"))
            return message.channel.send(
                "**You need `BAN_MEMBERS` permission to use this command**"
            );

        const muteReason = args.slice(1).join(' ') || "No Reason";

        const targetUser = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

        // @ts-ignore
        if (!message.guild?.member(targetUser)?.bannable) return message.channel.send("**Could not ban this user due to role hierchy**");

        if (targetUser?.id === client.user?.id) return message.channel.send("**<:Bruh:862681013946810388> Seriously Dude....**")
        if (targetUser?.id === message.author?.id) return message.channel.send("**Haha Very Funny**")

        message.channel.send(`**Successfully Muted ${targetUser} from this server.**`)

        const muteEmbed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle(`Muted in ${message.guild?.name}`)
            .setDescription(`**${message.author} Has Muted you from ${message.guild?.name} for \`${muteReason}\`. Please contact him if you want to get unbanned.**`)
            .setColor("#ed3737")
            .setFooter(client.user?.username, client.user?.displayAvatarURL())

        targetUser?.send(muteEmbed).catch((err) => { message.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })
    },
}

export default MuteCommand;