import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'
// @ts-ignore
import weather from 'weather-js'

const WeatherCommand: Command = {
    name: 'forecast',
    description: 'Watch the weather anywhere!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        weather.find({ search: args.join(" "), degreeType: 'C' }, function (err: Error, result: any) {
            if (err) throw err

            const embed = new MessageEmbed()
                .setAuthor(
                    `${result[0].location.name}`,
                    "https://media.discordapp.net/attachments/793772583946027050/823774180305534986/image-removebg-preview_8.png"
                )
                .setThumbnail("https://media.discordapp.net/attachments/793772583946027050/823774180305534986/image-removebg-preview_8.png")
                .setTimestamp()
                .setColor("#037ffc");
            for (var i = 0; i < result[0].forecast.length; ++i) {
                const results = result[0].forecast[i]
                embed.addField(results.day, `Highest: ${results.high}\nLowest: ${results.low}\nCondition: ${results.skytextday}`)
            }
            message.channel.send(embed);
        });
    },
}

export default WeatherCommand;