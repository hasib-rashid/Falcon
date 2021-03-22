const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "channel-info",
            aliases: [],
            group: "general",
            memberName: "channel-info",
            description: "Get the Information on the channel",
            details: oneLine`
                Get the Information on the channel
            `,
            examples: ["!channel-info"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const args = message.content.slice(5).trim().split("  ");
        let channel =
            message.mentions.channels.first() ||
            this.client.guilds.cache
                .get(message.guild.id)
                .channels.cache.get(args[0]) ||
            message.guild.channels.cache.find(
                (r) =>
                    r.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
            ) ||
            message.channel;
        if (!channel) return message.channel.send("**Channel Not Found!**");

        let channelembed = new Discord.MessageEmbed()
            .setTitle(`Channel Information for \`${channel.name}\``)
            .setThumbnail(message.guild.iconURL())
            .addField("**NSFW**", channel.nsfw, true)
            .addField("**Channel ID**", channel.id, true)
            .addField("**Channel Type**", channel.type)
            .addField(
                "**Channel Description**",
                `${channel.topic || "No Description"}`
            )
            .addField("**Channel Created At**", channel.createdAt)
            .setColor("GREEN");
        message.channel.send(channelembed);
    }
};
