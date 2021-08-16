import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { UtilsManager } from '../../utils/Utils'
const { googleShorten } = UtilsManager.prototype
import googleIt from 'google-it'

export const name = 'google'
export const category = 'search'
export const description = 'Search the all of Google'

export const run: RunFunction = async (client, message, args) => {
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
}