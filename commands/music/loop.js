const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const embedbuilder = require("../../util/embedBuilder.js");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "repeat",
            aliases: ["loop"],
            group: "music",
            memberName: "loop",
            description: "Repeat a song with this command",
            details: oneLine`
                Repeat a song with this command
            `,
            examples: ["!repeat"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            const args = message.content.split(" ").slice(1);

            if (0 <= Number(args[0]) && Number(args[0]) <= 2) {
                await this.client.distube.setRepeatMode(
                    message,
                    parseInt(args[0])
                );
                await embedbuilder(
                    this.client,
                    message,
                    "GREEN",
                    "Repeat mode set to:!",
                    `${args[0]
                        .replace("0", "OFF")
                        .replace("1", "Repeat song")
                        .replace("2", "Repeat Queue")}`
                );
                return;
            } else {
                return embedbuilder(
                    this.client,
                    message,
                    "RED",
                    "ERROR",
                    `Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`
                );
            }
        } catch (err) {
            message.channel.send(
                "**You are not in a Voice Channel or a song is not playing!**"
            );
        }
    }
};
