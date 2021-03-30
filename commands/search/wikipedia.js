const Discord = require("discord.js");
const commando = require("discord.js-commando");
const wiki = require("wikijs").default();
const oneLine = require("common-tags").oneLine;

module.exports = class WikipediaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "wiki",
            aliases: [],
            group: "search",
            memberName: "wiki",
            description: "Search Wikipedia with this stop",
            details: oneLine`
                Search Wikipedia with this stop
            `,
            examples: ["!wiki <query>"],
            credit: [
                {
                    name: "Wikipedia",
                    url: "https://www.wikipedia.org/",
                    reason: "API",
                    reasonURL: "https://en.wikipedia.org/w/api.php",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        const args = message.content.slice(5).trim().split("  ");

        if (!args[0]) return message.channel.send("**Please Enter A Query!**");
        let m = await message.channel.send({
            embed: {
                color: "GREEN",
                title: `Searching Wikipedia just for you ⌛`,
                description: `Please stand by...`,
            },
        });
        let result;
        const search = await wiki.search(args.join(" "));
        if (!search.results.length) {
            return m.edit({
                embed: {
                    color: "GREEN",
                    title: "What was that again? 📚🤓",
                    description:
                        "Even Wikipedia doesn't seem to know what you're talking about.",
                    footer: {
                        text:
                            "Check for typos or try searching for something else!",
                    },
                },
            });
        }
        result = await wiki.page(search.results[0]);
        try {
            let description = await result.summary();
            if (description.length > 8192) {
                const FirstEmbed = new Discord.MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(
                        `${description.substring(
                            0,
                            1950
                        )}...\nArticle is too long, click [**here**](${
                            result.raw.fullurl
                        }) to read more!`
                    );
                return m.edit(FirstEmbed);
            }
            if (description.length < 2048) {
                const SecondEmbed = new Discord.MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(`${description.slice(0, 2048)}`);
                return m.edit("", SecondEmbed);
            }
            if (description.length > 2048) {
                const ThirdEmbed = new Discord.MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(description.slice(0, 2048));
                const FourthEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(2048, 4096));
                m.edit("", ThirdEmbed);
                message.channel.send("", FourthEmbed);
            }
            if (description.length > 4096 && description.length < 6144) {
                const FifthEmbed = new Discord.MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(description.slice(0, 2048));
                const SixthEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(2048, 4096));
                const SeventhEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(
                        description.slice(4096, description.length)
                    );
                await m.edit("", FifthEmbed);
                message.channel.send(SixthEmbed);
                message.channel.send(SeventhEmbed);
            }
            if (description.length > 6144 && description.length < 8192) {
                const EightEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(0, 2048));
                const NinthEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(2048, 4096));
                const TenthEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(4096, 6144));
                const EleventhEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(
                        description.slice(6144, description.length)
                    );
                await m.edit("", EightEmbed);
                message.channel.send(NinthEmbed);
                message.channel.send(TenthEmbed);
                message.channel.send(EleventhEmbed);
            }
        } catch (e) {
            return m.edit("Not Available!");
        }
    }
};
