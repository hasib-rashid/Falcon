require("dotenv").config();

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const weather = require('weather-js');

module.exports = class WeatherCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "forecast",
            aliases: [],
            group: "search",
            memberName: "forecast",
            description:
                "Search the Forecast from anywhere and check the weather",
            details: oneLine`
                Search the Forecast from anywhere and check the weather
            `,
            examples: ["!forecast <location>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        try {
            const args = message.content.split(" ").slice(1)

            weather.find({ search: args.join(" "), degreeType: 'C' }, function (err, result) {
                if (err) throw err

                const embed = new Discord.MessageEmbed()
                    .setAuthor(
                        `${result[0].location.name}`,
                        "https://media.discordapp.net/attachments/793772583946027050/823774180305534986/image-removebg-preview_8.png"
                    )
                    .setThumbnail("https://media.discordapp.net/attachments/793772583946027050/823774180305534986/image-removebg-preview_8.png")
                    .setTimestamp()
                    .setColor("#037ffc");

                for (var i = 0; i < result[0].forecast.length; ++i) {
                    const results = result[0].forecast[i]

                    console.log(results)

                    embed.addField(results.day, `Highest: ${results.high}\nLowest: ${results.low}\nCondition: ${results.skytextday}`)
                }

                message.channel.send(embed);
            });
        } catch (err) {
            console.error(err);
        }
    }
};
