import Command from '../../constants/command';
import { default as axios } from 'axios'
import { MessageEmbed } from 'discord.js'

const HugCommand: Command = {
    name: 'hug',
    description: 'Hug someone!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get("https://some-random-api.ml/animu/hug").then((res) => {
            const mentioned = message.mentions.users.first() || message.guild?.members.cache.get(args[0])

            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setDescription(`<@${message.author.id}> hugged <@${mentioned}>`)
                .setImage(res.data.link)

            message.channel.send(embed)
        })
    },
}

export default HugCommand;