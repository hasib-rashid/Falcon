const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const moment = require("moment");
require("moment-duration-format");

module.exports = class UptimeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "uptime",
            aliases: [],
            group: "misc",
            memberName: "uptime",
            description: "Check the Uptime of the bot",
            details: oneLine`
                Check the Uptime of the bot
            `,
            examples: ["!uptime"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        message.channel.send(
            `:low_brightness: **Uptime:** ${moment
                .duration(this.client.uptime)
                .format("d:hh:mm:ss")}`
        );
    }
};
