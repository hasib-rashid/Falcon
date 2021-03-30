const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "resume",
            aliases: [],
            group: "music",
            memberName: "resume",
            description: "Resume a song which is paused",
            details: oneLine`
                Resume a song which is paused
            `,
            examples: ["!resume"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            this.client.distube.resume(messaeg);

            message.channel.send("**Resumed the song in the Voice Channel!**");
        } catch (err) {
            message.channel.send(
                "**Please make sure that you are in a voice channel and playing a song and if a song is paused or not**"
            );
        }
    }
};
