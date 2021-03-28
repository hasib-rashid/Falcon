const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const embedbuilder = require("../../util/embedBuilder.js");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "queue",
            aliases: [],
            group: "music",
            memberName: "queue",
            description: "Get the queue of the current guild",
            details: oneLine`
                Get the queue of the current guild
            `,
            examples: ["!queue"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            let queue = this.client.distube.getQueue(message);
            message.channel.send(
                "Current queue:\n" +
                    queue.songs
                        .map(
                            (song, id) =>
                                `**${id + 1}**. [${song.name}](${
                                    song.url
                                }) - \`${song.formattedDuration}\``
                        )
                        .join("\n")
            );
        } catch (err) {
            console.log(err);
            message.channel.send("**An Unexpected Error Occured**");
        }
    }
};
