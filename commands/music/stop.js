const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "stop",
            aliases: [],
            group: "music",
            memberName: "stop",
            description: "Stop the song and leave the voice channel",
            details: oneLine`
                Stop the song and leave the voice channel
            `,
            examples: ["!stop"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const voiceChannel = message.member.voice.channel;

        voiceChannel.leave();
        message.channel.send(
            ":white_check_mark: Stopped the Radio and left the Voice channel!"
        );
    }
};
