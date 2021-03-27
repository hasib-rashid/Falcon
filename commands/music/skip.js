const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "skip",
            aliases: [],
            group: "music",
            memberName: "skip",
            description: "Skip a song in queue",
            details: oneLine`
                Skip a song in queue
            `,
            examples: ["!skip"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            message.channel.send(":white_check_mark: Song Skipped!");

            return distube.skip(message);
        } catch (err) {
            message.channel.send("**You are not in a Voice Channel**");
        }
    }
};
