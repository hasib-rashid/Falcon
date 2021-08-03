import Command from '../../constants/command';
// @ts-ignore
import lyrics from 'findthelyrics'
import { MessageEmbed } from 'discord.js';

const LyricsCommand: Command = {
    name: 'lyrics',
    description: 'Look at the lyrics of Falcon',
    aliases: [
        'lyric'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!args.join(" ")) return message.channel.send("**Please mention the song you want the lyrics of.**")
        lyrics.find(args.join(" "), function (err: Error, resp: any) {
            if (!err) {
                const embed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL())
                    .setTitle(args.join(" "))
                    .setDescription(resp)
                    .setColor("BLUE")

                message.channel.send(embed)
            } else {
                console.log(err)
            }
        });
    },
}

export default LyricsCommand;