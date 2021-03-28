const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "toggle-autoplay",
            aliases: [],
            group: "music",
            memberName: "toggle-autoplay",
            description: "Toggle the Autoplay",
            details: oneLine`
                Toggle the Autoplay
            `,
            examples: ["!toggle-autoplay"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            this.client.distube.toggleAutoplay(message);

            message.channel.send("**Toggled the Autoplay!**");
        } catch (err) {
            message.channel.send(
                "**Please make sure that you are in a voice channel and you are playing a music!**"
            );
        }
    }
};
