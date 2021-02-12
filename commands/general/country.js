const Discord = require("discord.js");
const request = require("node-superfetch");
const axios = require("axios");
const formatter = require("bob-number-formatter");

module.exports = {
    name: "country",
    description: "Finds the Country you want the information for",
    usage: "!country <name>",
    aliases: ["co", "coun"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    const query = args.shift();

    try {
        const { body } = await axios.get(
            `https://restcountries.eu/rest/v2/name/${query}`
        );
        const data = body[0];
        const embed = new Discord.MessageEmbed()
            .setColor(0x00ae86)
            .setTitle(data.name)
            .setThumbnail(
                `https://www.countryflags.io/${data.alpha2Code}/flat/64.png`
            )
            .addField("❯ Population", formatter(data.population), true)
            .addField("❯ Capital", data.capital || "None", true)
            .addField("❯ Currency", data.currencies[0].symbol, true)
            .addField("❯ Location", data.subregion || data.region, true)
            .addField("❯ Demonym", data.demonym || "None", true)
            .addField("❯ Native Name", data.nativeName, true)
            .addField("❯ Area", `${formatter(data.area)}km`, true)
            .addField(
                "❯ Languages",
                data.languages.map((lang) => lang.name).join("/")
            );
        return message.channel.send(embed);
    } catch (err) {
        if (err.status === 404)
            return message.channel.send(
                ":no_entry: Could not find any results."
            );
    }
};
