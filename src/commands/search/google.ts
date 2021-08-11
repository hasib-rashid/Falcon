import Command from '../../typings/command';
// @ts-ignore
import googleIt from 'google-it'
import { MessageEmbed } from 'discord.js';
import { googleShorten } from '../../util/Util'

const GoogleCommand: Command = {
    name: 'google',
    description: 'Google anything on Falcon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        message.channel.send("🤔 Retrieving Results.....").then((msg) => {
            const embed = new MessageEmbed()
                .setTitle("Google")
                .setAuthor(
                    "Google",
                    "https://expresswriters.com/wp-content/uploads/2015/09/google-new-logo-450x450.jpg"
                )
                .setColor("#1183ed")

            googleIt({ 'query': args.join(" ") }).then((results: any) => {

                for (var i = 0; i < results.length; ++i) {
                    var result = results[i];

                    embed.addField(result.title, `[Link](${result.link}) - ${googleShorten(result.snippet)}`)

                }

                msg.channel.send(embed)
            }).catch((err: any) => {
                console.error(err)
            })
        })
    },
}

export default GoogleCommand;