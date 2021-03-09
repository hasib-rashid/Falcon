const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const { formatNumber } = require("../../util/Util");
module.exports = class PlayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "play",
            aliases: [],
            group: "music",
            memberName: "play",
            description: "Play a music here!",
            details: oneLine`
                Search a music here!
            `,
            examples: ["!Search <song_name>"],
            args: [
                {
                    key: "query",
                    type: "string",
                    prompt: "Please specify the song you wanna play",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { query }) {
        try {
            message.channel.send(
                "<:YouTube:801465200775135282> **Searching** :mag_right: `" +
                    `${query}` +
                    "`"
            );

            distube.play(message, query);
        } catch (err) {
            console.error(err);
        }
    }
};
