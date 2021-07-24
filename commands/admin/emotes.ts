import { MessageEmbed } from 'discord.js';
import Command from '../../constants/command';

const EmotesCommand: Command = {
    name: 'emotes',
    description: 'See all the emotes in this server',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        message.guild?.emojis.cache.map((ev) => {
            const emotes = [`<:${ev.name}:${ev.id}>`]
            const embed = new MessageEmbed()
                .setAuthor(message.guild?.name, message.guild?.iconURL() || "")
                .setTitle("All Emotes")
                .setDescription(emotes.join(" "))
                .setColor("BLUE")

            message.channel.send(embed)
        })
    },
}

export default EmotesCommand;