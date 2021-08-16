import { MessageEmbed, TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'bug'
export const category = 'notify'
export const description = 'Report a Bug of Falcon. If used for disturbing then you may get blacklisted by the owner of Falcon'

export const run: RunFunction = async (client, message, args) => {
    let bug
    let bugMessage

    message.channel.send("**Explain briefly about the bug. If no bugs found then type `cancel`.**")
    await message.channel.awaitMessages(m => m.author.id == message.author.id,
        { max: 1, time: 30000 }).then(collected => {
            if (collected.first()?.content === "cancel") return message.channel.send("**Canceled the operation**")
            bug = collected.first()?.content
        }).catch(() => {
            message.reply('**No answer after 30 seconds, operation canceled.**');
        })

    message.channel.send("**What is the Bug Message that it gave. If no bugs found then type `cancel`.**")
    await message.channel.awaitMessages(m => m.author.id == message.author.id,
        { max: 1, time: 30000 }).then(collected => {
            if (collected.first()?.content === "cancel") return message.channel.send("**Canceled the operation**")
            bugMessage = collected.first()?.content
        }).catch(() => {
            message.reply('**No answer after 30 seconds, operation canceled.**');
        })

    const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle("Bug")
        .setColor("RED")
        .addField("Information", `GuildID: ${message.guild.id} | UserID: ${message.author.id}`)
        .addField("Bug", bug)
        .setDescription(`\`\`\`js${bugMessage}\`\`\``)

    return (client.channels.cache.get("876620815653830676") as TextChannel).send(embed).catch((err) => {
        message.channel.send("**Maybe the Bug Message or the Bug Is too Big. Try reducing the size of the message of the BugMessage component**")
    })
}