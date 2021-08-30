import { Message } from 'discord.js';
import { MessageEmbed, TextChannel } from 'discord.js';
import { features } from 'process';
import { RunFunction } from '../../interfaces/Command';

export const name = 'feature'
export const category = 'notify'
export const description = 'Give a idea about a feature. We would love the feedback. But if you mess around then there is a chance that you will get blacklisted by the owner'

export const run: RunFunction = async (client, message, args) => {
    let feature

    message.channel.send("**Explain briefly about the Feature. If no bugs found then type `cancel`. You have 5 minutes to explain**")
    await message.channel.awaitMessages({ filter: (m: Message) => m.author.id === message.author.id, max: 1, time: 300000 }).then(collected => {
        if (collected.first().author.id !== message.author.id) return;
        feature = collected.first()?.content
    }).catch(() => {
        message.reply('**No answer after 30 seconds, operation canceled.**');
    })

    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle("Feature")
        .setColor("GREEN")
        .addField("Information", `GuildID: ${message.guild.id} | UserID: ${message.author.id}`)
        .setDescription(`\`\`\`${feature}\`\`\``)

    return (client.channels.cache.get("876620815653830676") as TextChannel).send({ embeds: [embed] }).catch((err) => {
        message.channel.send("**Maybe the Feature Message is too big. Try reducing the size of the message :)**")
    })
}