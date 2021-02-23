const Discord = require("discord.js");
const { formatNumber } = require("../../util/Util");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");
const axios = require("axios");

module.exports = class CountryCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "country",
            aliases: ["co", "coun"],
            group: "search",
            memberName: "country",
            description: "Search about any country suing this command",
            details: oneLine`
                Search about any country suing this command
            `,
            examples: ["!country <country_name>"],
            credit: [
                {
                    name: "Rest Countries",
                    url: "https://restcountries.eu/",
                    reason: "API",
                },
            ],
            args: [
                {
                    key: "query",
                    prompt: "What country would you like to search for?",
                    type: "string",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { query }) {
        try {
            const { body } = await request.get(
                `https://restcountries.eu/rest/v2/name/${encodeURIComponent(
                    query
                )}`
            );
            const data =
                body.find((country) => {
                    const search = query.toLowerCase();
                    return (
                        country.name.toLowerCase() === search ||
                        country.altSpellings.some(
                            (alt) => alt.toLowerCase() === search
                        ) ||
                        country.alpha2Code.toLowerCase() === search ||
                        country.alpha3Code.toLowerCase() === search ||
                        country.nativeName.toLowerCase() === search
                    );
                }) || body[0];
            const embed = new Discord.MessageEmbed()
                .setColor(0x00ae86)
                .setTitle(data.name)
                .setThumbnail(
                    `https://www.countryflags.io/${data.alpha2Code}/flat/64.png`
                )
                .addField("❯ Population", formatNumber(data.population), true)
                .addField("❯ Capital", data.capital || "None", true)
                .addField("❯ Currency", data.currencies[0].symbol, true)
                .addField("❯ Location", data.subregion || data.region, true)
                .addField("❯ Demonym", data.demonym || "None", true)
                .addField("❯ Native Name", data.nativeName, true)
                .addField("❯ Area", `${formatNumber(data.area)}km`, true)
                .addField(
                    "❯ Languages",
                    data.languages.map((lang) => lang.name).join("/")
                );
            return message.embed(embed);
        } catch (err) {
            if (err.status === 404)
                return msg.say("Could not find any results.");
            console.error(err);
        }
    }
};
