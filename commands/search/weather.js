require("dotenv").config();

const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");

module.exports = class WeatherCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "weather",
            aliases: [],
            group: "search",
            memberName: "weather",
            description:
                "Search the Weather from anywhere and check the weather",
            details: oneLine`
                Search the Weather from anywhere and check the weather
            `,
            examples: ["!weather <location>"],
            credit: [
                {
                    name: "OpenWeatherMap",
                    url: "https://openweathermap.org/",
                    reason: "API",
                    reasonURL: "https://openweathermap.org/api",
                },
            ],
            args: [
                {
                    key: "location",
                    prompt:
                        "What location would you like to get the weather of?",
                    type: "string",
                    parse: (location) => {
                        if (/^[0-9]+$/.test(location))
                            return { type: "zip", data: location };
                        return { type: "q", data: location };
                    },
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { location }) {
        try {
            const { body } = await request
                .get("https://api.openweathermap.org/data/2.5/weather")
                .query({
                    q: location.type === "q" ? location.data : "",
                    zip: location.type === "zip" ? location.data : "",
                    units: "imperial",
                    appid: process.env.WEATHER_API,
                });
            const embed = new MessageEmbed()
                .setColor(0xff7a09)
                .setAuthor(
                    `${body.name}, ${body.sys.country}`,
                    "https://i.imgur.com/NjMbE9o.png",
                    "https://openweathermap.org/city"
                )
                .setURL(`https://openweathermap.org/city/${body.id}`)
                .setTimestamp()
                .addField(
                    "❯ Condition",
                    body.weather
                        .map((data) => `${data.main} (${data.description})`)
                        .join("\n")
                )
                .addField("❯ Temperature", `${body.main.temp}°F`, true)
                .addField("❯ Humidity", `${body.main.humidity}%`, true)
                .addField("❯ Wind Speed", `${body.wind.speed} mph`, true);
            return message.embed(embed);
        } catch (err) {
            if (err.status === 404)
                return message.say("Could not find any results.");
            console.error(err);
        }
    }
};
