import { RunFunction } from '../../interfaces/Command';
import { default as axios } from 'axios'
import { MessageEmbed } from 'discord.js'

export const name = 'hug'
export const category = 'fun'
export const description = 'Hug someone ;('

export const run: RunFunction = async (client, message, args) => {
    axios.get("https://some-random-api.ml/animu/hug").then((res) => {
        const mentioned = message.mentions.users.first() || message.guild?.members.cache.get(args[0])

        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(`<@${message.author.id}> hugged <@${mentioned}>`)
            .setImage(res.data.link)
            .setColor("#337ef5")

        message.channel.send(embed)
    })
}