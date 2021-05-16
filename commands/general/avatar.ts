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

        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle(`${username}'s Avatar`)

        message.channel.send(embed)
    },
}

export default AvatarCommand;