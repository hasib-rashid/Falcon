import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'avatar'
export const category = 'general'
export const description = 'Check your avatar'

export const run: RunFunction = async (client, message, args) => {
    const username = message.mentions.users.first()?.username || message.guild?.members.cache.get(args[0])?.user.username || message.author.username
    const image = message.mentions.users.first()?.displayAvatarURL({ dynamic: true, size: 256 }) || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL({ dynamic: true, size: 256 }) || message.author.displayAvatarURL({ dynamic: true, size: 256 })

    const png_image = message.mentions.users.first()?.displayAvatarURL({ dynamic: true, format: "png" }) || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL({ dynamic: true, format: "png" }) || message.author.displayAvatarURL({ dynamic: true, format: "png" })
    const jpg_image = message.mentions.users.first()?.displayAvatarURL({ dynamic: true, format: "jpg" }) || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL({ dynamic: true, format: "jpg" }) || message.author.displayAvatarURL({ dynamic: true, format: "jpg" })
    const jpeg_image = message.mentions.users.first()?.displayAvatarURL({ dynamic: true, format: "jpeg" }) || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL({ dynamic: true, format: "jpeg" }) || message.author.displayAvatarURL({ dynamic: true, format: "jpeg" })
    const webp_image = message.mentions.users.first()?.displayAvatarURL({ dynamic: true, format: "webp" }) || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL({ dynamic: true, format: "webp" }) || message.author.displayAvatarURL({ dynamic: true, format: "webp" })

    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`${username}'s Avatar`)
        .setDescription(`**Download Images**\n[png](${png_image}) | [jpg](${jpg_image}) | [jpeg](${jpeg_image}) | [webp](${webp_image})`)
        .setImage(image)
        .setColor("#347aeb")

    message.channel.send({ embeds: [embed] })
}