const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "set-volume",
            aliases: ["vol", "volume"],
            group: "music",
            memberName: "set-volume",
            description: "Set the Volume of the current song",
            details: oneLine`
                Set the Volume of the current song
            `,
            examples: ["!set-volume 70"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            const args = message.content.split(" ").slice(1);

            this.client.distube.setVolume(message, args[0]);

            message.channel.send(`**Volume set to \`${args[0]}\`!**`);
        } catch (err) {
            message.channel.send("**An unexpected Error Occured**");
        }
    }
};
