const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "add-related-video",
            aliases: [],
            group: "music",
            memberName: "add-related-video",
            description: "Add a related Video",
            details: oneLine`
                Add a related Video
            `,
            examples: ["!add-related-video"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            this.client.distube.addRelatedVideo(message);
        } catch (err) {
            message.channel.send("**You are not in a voice channel!**");
        }
    }
};
