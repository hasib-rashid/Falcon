import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'
import { default as axios } from 'axios'
import { formatNumber } from '../../util/Util'

const CovidCommand: Command = {
    name: 'covid',
    description: 'Watch the latest news of covid 19',
    aliases: [
        'covid19', 'cov', 'covid-19'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            if (args) {
                axios.get(`https://corona.lmao.ninja/v2/countries/${args[0]}?yesterday=true&strict=true&query`).then(({ data }) => {
                    const embed = new MessageEmbed()
                        .setTitle(`**${data.country}**`)
                        .setDescription(
                            "**View all the latest Covid 19 news in Falcon. The situation of Covid is on the way.**"
                        )
                        .setThumbnail(data.countryInfo.flag)
                        .setImage("https://images-ext-2.discordapp.net/external/Xo8QZezbd8LLT_NhijeH0eeFWYs-0JpqnJgcOb6KXZE/https/i.imgur.com/tGAnKcH.png?width=1025&height=267")
                        .addFields(
                            {
                                name: "**❯ Total Cases**",
                                value: `**${formatNumber(data.cases)}**`,
                                inline: true,
                            },
                            {
                                name: "**❯ Total Deaths**",
                                value: `**${formatNumber(data.deaths)}**`,
                                inline: true,
                            },
                            {
                                name: "**❯ Total Recovery**",
                                value: `**${formatNumber(data.recovered)}**`,
                                inline: true,
                            },
                            {
                                name: "**❯ Cases Today**",
                                value: `**${formatNumber(data.todayCases)}**`,
                                inline: true,
                            },
                            {
                                name: "**❯ Deaths Today**",
                                value: `**${formatNumber(data.todayDeaths)}**`,
                                inline: true,
                            },
                            {
                                name: "**❯ Recovery Today**",
                                value: `**${formatNumber(data.todayRecovered)}**`,
                                inline: true,
                            },
                            {
                                name: "**❯ Active Cases**",
                                value: `**${formatNumber(data.active)}**`,
                                inline: true,
                            },
                            {
                                name: "**❯ Critical Cases**",
                                value: `**${formatNumber(data.critical)}**`,
                                inline: true,
                            },
                            {
                                name: "**❯ Tests Today**",
                                value: `**${formatNumber(data.tests)}**`,
                                inline: true,
                            }
                        )
                        .setColor("#e6295f");

                    message.channel.send(embed);
                })
            } else {
                axios.get("https://corona.lmao.ninja/v2/all?yesterday").then(({ data }) => {
                    const embed = new MessageEmbed()
                        .setAuthor(
                            message.author.username,
                            message.author.displayAvatarURL()
                        )
                        .setTitle("Covid 19 Information")
                        .setDescription(
                            "View all the latest Covid 19 news in CodeVert. The situation of Covid is on the way."
                        )
                        .addFields(
                            {
                                name: "❯ Total Cases",
                                value: data.cases,
                                inline: true,
                            },
                            {
                                name: "❯ Total Deaths",
                                value: formatNumber(data.deaths),
                                inline: true,
                            },
                            {
                                name: "❯ Total Recovery",
                                value: formatNumber(data.recovered),
                                inline: true,
                            },
                            {
                                name: "❯ Cases Today",
                                value: formatNumber(data.todayCases),
                                inline: true,
                            },
                            {
                                name: "❯ Deaths Today",
                                value: formatNumber(data.todayDeaths),
                                inline: true,
                            },
                            {
                                name: "❯ Recovery Today",
                                value: formatNumber(data.todayRecovered),
                                inline: true,
                            },
                            {
                                name: "❯ Active Cases",
                                value: formatNumber(data.active),
                                inline: true,
                            },
                            {
                                name: "❯ Critical Cases",
                                value: formatNumber(data.critical),
                                inline: true,
                            },
                            {
                                name: "❯ Tests Today",
                                value: formatNumber(data.tests),
                                inline: true,
                            }
                        )
                        .setColor("BLUE");

                    message.channel.send(embed);
                })
            }
        } catch (err) {
            console.error(err);
        }
    },
}

export default CovidCommand;