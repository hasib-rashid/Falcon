const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const embedbuilder = require("../../util/embedBuilder.js");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "seek",
            aliases: [],
            group: "music",
            memberName: "seek",
            description: "Seek a song from one timestamp to another",
            details: oneLine`
                Seek a song from one timestamp to another
            `,
            examples: ["!seek"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            const args = message.content.split(" ").slice(1);

            if (!args) {
                message.channel.send(
                    ":no_entry: **Please specify where will I move the song to in seconds?**"
                );
            }
            await embedbuilder(
                this.client,
                message,
                "GREEN",
                "Seeked!",
                `Seeked the song to \`${args[0]} seconds\``
            );
            await this.client.distube.seek(message, Number(args[0] * 1000));
            await delay(5000);
            await message.channel.bulkDelete(2);
            return;
        } catch (err) {
            message.channel.send(
                "**You are not in a voice channel or a song isnt playing!**"
            );
        }
    }
};
