const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "set-repeatmode",
            aliases: [],
            group: "music",
            memberName: "set-repeatmode",
            description: "Set the Repeat Mode",
            details: oneLine`
                Set the Repeat Mode
            `,
            examples: ["!set-repeatmode 2"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            const args = message.content.split(" ").slice(1);

            this.client.distube.setRepeatMode(message, args[0]);

            message.channel.send("**Repeat Mode Successfully made!**");
        } catch (err) {
            message.channel.send(
                "**An unexpected Error occured. Please make the command again or contact us**"
            );
        }
    }
};
