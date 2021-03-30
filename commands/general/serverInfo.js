const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const moment = require("moment");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "server-info",
            aliases: ["serverinfo", "guildinfo", "guild-info"],
            group: "general",
            memberName: "server-info",
            description: "Information about the current Discord Server",
            details: oneLine`
                Information about the current Discord Server
            `,
            examples: ["!server-info"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            const embed = new Discord.MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setTitle(message.guild.name)
                .setThumbnail(message.guild.iconURL())
                .setColor("#3487fa")
                .addField("Guild Info", [
                    `**Name:** ${message.guild.name}`,
                    `**ID:** ${message.guild.id}`,
                    `**Owner** ${message.guild.owner}`,
                ])
                .addField("Counts", [
                    `**Roles:** ${message.guild.roles.cache.size} Roles`,
                    `**Channels:** ${
                        message.guild.channels.cache.filter(
                            (ch) =>
                                ch.type === "text" ||
                                ch.type === "voice" ||
                                ch.type === "news" ||
                                ch.type === "store"
                        ).size
                    } channels`,
                    `**Text Channels:** ${
                        message.guild.channels.cache.filter(
                            (ch) => ch.type === "text"
                        ).size
                    } channels`,
                    `**Voice Channels:** ${
                        message.guild.channels.cache.filter(
                            (ch) => ch.type === "voice"
                        ).size
                    } channels`,
                    `**Emojis:** ${message.guild.roles.cache.size} emojis`,
                    `**Regular Emojis:** ${
                        message.guild.roles.cache.filter((e) => !e.animated)
                            .size
                    }`,
                    `**Animated Emojis:** ${
                        message.guild.roles.cache.filter((e) => e.animated).size
                    }`,
                ])
                .addField("Additional Information", [
                    `**Created At:** ${moment(
                        message.guild.createdTimestamp
                    ).format("LL")} \n (${moment(
                        message.guild.createdTimestamp
                    ).fromNow()})`,
                    `**Region:** ${message.guild.region}`,
                    `**Boost Tier:** ${
                        message.guild.premiumTier
                            ? `Tier ${message.guild.premiumTier}`
                            : "None"
                    }`,
                    `**Number of Boosts:** ${
                        message.guild.premiumSubscriptionCount || "0"
                    }`,
                ]);

            message.channel.send(embed);
        } catch (err) {
            console.error(err);
        }
    }
};
