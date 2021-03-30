const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "stop",
            aliases: [],
            group: "music",
            memberName: "stop",
            description: "Cleares the queue and leaves the voice channel",
            details: oneLine`
                Cleares the queue and leaves the voice channel
            `,
            examples: ["!stop"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            this.client.distube.stop(message);

            message.channel.send(
                "**✅ Cleared the queue and left the voice channel!**"
            );
        } catch (err) {
            message.channel.send(
                "**Please make sure you are in a voice channel and also playing a song!**"
            );
        }
    }
};
