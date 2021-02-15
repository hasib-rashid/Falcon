const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

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
     * @param {commando.Client} client
     */

    async run(message, client) {
        let totalSeconds = this.client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds / 60;
        message.channel.send(
            `:low_brightness: **Uptime:** ${days} days, ${hours} hours and ${minutes} minutes!`
        );
    }
};
