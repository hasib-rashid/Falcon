import { RunFunction } from '../../interfaces/Command';
import { MessageEmbed } from 'discord.js'
import { default as axios } from 'axios'

export const name = 'ip'
export const category = 'general'
export const description = 'Find the Information about a IP or website'

export const run: RunFunction = async (client, message, args) => {
    if (!args[0]) return message.channel.send("**Please put a IP or a name of a website.**")
    axios.get(`http://ip-api.com/json/${args.join(" ")}`).then((response) => {
        if (response.data.status === "fail") return message.channel.send("**Please Enter a valid IP or a website**")
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setAuthor(
                message.author.username,
                message.author.displayAvatarURL()
            )
            .setFooter("Powered by IP-API.com")
            .setTimestamp()
            .setTitle(args.join(" "))
            .addField("❯ IP", response.data.query, true)
            .addField("❯ Country", response.data.country || "None", true)
            .addField("❯ Region", response.data.regionName || "None", true)
            .addField(
                "❯ City",
                response.data.city || response.data.region || "None",
                true
            )
            .addField("❯ Zip Code", response.data.zip || "None", true)
            .addField("❯ Timezone", response.data.timezone || "None", true)
            .addField("❯ ISP", response.data.isp || "None", true)
            .addField("❯ Organization", response.data.org || "None", true)
            .addField("❯ Proxy", "Yes", true);

        message.channel.send({ embeds: [embed] });
    })
}