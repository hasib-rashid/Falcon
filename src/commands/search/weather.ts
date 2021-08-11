import Command from '../../typings/command';
import { MessageEmbed } from 'discord.js'
//@ts-ignore
import weather from 'weather-js'

const WeatherCommand: Command = {
    name: 'weather',
    description: 'Watch the weather anywhere',
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
                .setTimestamp()
                .addFields(
                    { name: "Temperature", value: `${result[0].current.temperature} C°`, inline: true },
                    { name: "Observation Time", value: result[0].current.observationtime, inline: true },
                    { name: "Observation Point", value: result[0].current.observationpoint, inline: true },
                    { name: "Feels Like", value: `${result[0].current.feelslike} C°`, inline: true },
                    { name: "Humidity", value: `${result[0].current.humidity} C°`, inline: true },
                    { name: "Wind Display", value: result[0].current.winddisplay, inline: true },
                    { name: "Day", value: result[0].current.day, inline: true },
                    { name: "WindSpeed", value: result[0].current.windspeed, inline: true },
                    { name: "TimeZone", value: result[0].location.timezone, inline: true },
                    { name: "Location", value: `${result[0].location.lat}, ${result[0].location.long}`, inline: true },
                    { name: "Occurable Condition", value: result[0].current.skytext, inline: true },
                    { name: "Date", value: result[0].current.date, inline: true },
                )
                .setColor("#037ffc");
            message.channel.send({ embeds: [embed] });
        })
    }
}
export default WeatherCommand;