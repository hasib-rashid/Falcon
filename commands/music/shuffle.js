const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "shuffle",
            aliases: [],
            group: "music",
            memberName: "shuffle",
            description: "Shuffle a playlist of songs",
            details: oneLine`
                Shuffle a playlist of songs
            `,
            examples: ["!shuffle"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            this.client.distube.shuffle(message);

            message.channel.send(
                "**Successfully Shuffled the songs in the queue!**"
            );
        } catch (err) {
            message.channel.send(
                "**You are not in a voice channel or no song is playing**"
            );
        }
    }
};
