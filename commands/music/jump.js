const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "jump",
            aliases: [],
            group: "music",
            memberName: "jump",
            description: "Jump to a certain part of a queue",
            details: oneLine`
                Jump to a certain part of a queue
            `,
            examples: ["!jump <the number of song in the queue>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            const args = message.content.split(" ").slice(1);

            this.client.distube.jump(message, parseInt(args[0]));

            message.channel.send(
                "**Successfully jumped to the song in queue!**"
            );
        } catch (err) {
            message.channel.send(
                "A unexpected Error Occured. Please make sure if you are in a voice channel and playing a music and if the problem still stays then join our support server in `info` command or report with `bug` command."
            );
        }
    }
};
