const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const setWelcomeChannelSchema = require("../../models/welcomeChannelSchema.js");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "setwelcomechannel",
            aliases: [],
            group: "moderation",
            memberName: "setwelcomechannel",
            description: "Set a Welcome Channel",
            details: oneLine`
                Set a Welcome Channel
            `,
            examples: ["!setwelcomechannel"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(
                "**You do not have the permission to use this command**"
            );

        const channel = message.mentions.channels.first() || message.channel;

        setWelcomeChannelSchema.findOne(
            { guild: message.guild.id },
            async (err, data) => {
                if (data) data.delete();

                new setWelcomeChannelSchema({
                    guild: message.guild.id,
                    channel: channel,
                }).save();

                message.channel.send(
                    `**The Welcome channel has been set to ${channel}!**`
                );
            }
        );
    }
};
