const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "pause",
            aliases: [],
            group: "music",
            memberName: "pause",
            description: "Pause a song from the queue",
            details: oneLine`
                Pause a song from the queue
            `,
            examples: ["!pause"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            this.client.distube.pause(message);

            message.channel.send("**Successfully Paused the current song!**");
        } catch (err) {
            message.channel.send(
                "**Either you are not in a voice channel or a song is not playing**"
            );
        }
    }
};
