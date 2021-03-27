const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "play",
            aliases: [],
            group: "music",
            memberName: "play",
            description: "Play a song in the VC",
            details: oneLine`
                Play a song in the VC
            `,
            examples: ["!play <song>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const args = message.content.split(" ").slice(1);

        if (!args)
            return message.channel.send(
                "**Please sepcify which song do i play!**"
            );

        message.channel.send(
            "<:YouTube:801465200775135282> **Searching** :mag_right: `" +
                `${args}` +
                "`"
        );

        this.client.distube.play(message, args.join(" "));
    }
};
