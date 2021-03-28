const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "play-skip",
            aliases: [],
            group: "music",
            memberName: "play-skip",
            description: "Skip and Play another song",
            details: oneLine`
            Skip and Play another song
            `,
            examples: ["!play-skip"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            this.client.distube.playSkip(message);
        } catch (err) {
            message.channel.send("**You are not in a voice channel!**");
        }
    }
};
