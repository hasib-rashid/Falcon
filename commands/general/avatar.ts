import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'

const AvatarCommand: Command = {
    name: "avatar",
    description: 'Check your or others avatar here!!',
    aliases: ["av", "profile-picture", "profile-pic", "pfp"],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const username = message.mentions.users.first()?.username || message.guild?.members.cache.get(args[0])?.user.username || message.author.username
        const image = message.mentions.users.first()?.displayAvatarURL({ dynamic: true, size: 256 }) || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL({ dynamic: true, size: 256 }) || message.author.displayAvatarURL({ dynamic: true, size: 256 })

        const png_image = message.mentions.users.first()?.displayAvatarURL({ dynamic: true, format: "png" }) || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL({ dynamic: true, format: "png" }) || message.author.displayAvatarURL({ dynamic: true, format: "png" })
        const jpg_image = message.mentions.users.first()?.displayAvatarURL({ dynamic: true, format: "jpg" }) || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL({ dynamic: true, format: "jpg" }) || message.author.displayAvatarURL({ dynamic: true, format: "jpg" })
        const gif_image = message.mentions.users.first()?.displayAvatarURL({ dynamic: true, format: "gif" }) || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL({ dynamic: true, format: "jpg" }) || message.author.displayAvatarURL({ dynamic: true, format: "jpg" })
        const jpeg_image = message.mentions.users.first()?.displayAvatarURL({ dynamic: true, format: "jpeg" }) || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL({ dynamic: true, format: "jpeg" }) || message.author.displayAvatarURL({ dynamic: true, format: "jpeg" })
        const webp_image = message.mentions.users.first()?.displayAvatarURL({ dynamic: true, format: "webp" }) || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL({ dynamic: true, format: "webp" }) || message.author.displayAvatarURL({ dynamic: true, format: "webp" })

        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle(`${username}'s Avatar`)
            .setDescription(`**Download Images**\n[PNG](${png_image}) | [JPG](${jpg_image}) | [JPEG](${jpeg_image}) | [GIF](${gif_image}) | [WEPB](${webp_image})`)
            .setImage(image)

        message.channel.send(embed)
    },
}

export default AvatarCommand;