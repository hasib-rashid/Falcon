const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "greroll",
            aliases: [
                "giveaway-reroll",
                "gw-reroll",
                "gway-reroll",
                "g-reroll",
            ],
            group: "moderation",
            memberName: "greroll",
            description: "Reroll a Giveaway",
            details: oneLine`
                Reroll a Giveaway
            `,
            examples: ["!greroll <id>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send(
                "**You need `MANAGE_MESSAGES` permission to use this command**"
            );

        const args = message.content.split(" ").slice(1);

        if (!args) {
            message.channel.send("**Specify the Message ID please**");
        }

        let messageID = args[0];
        this.client.giveaways.reroll(messageID).catch((err) => {
            message.channel.send(
                "No giveaway found for `" +
                    messageID +
                    "`, please check and try again"
            );
        });
    }
};
