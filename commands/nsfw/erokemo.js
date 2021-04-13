const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "erokemo",
            aliases: [],
            group: "nsfw",
            memberName: "erokemo",
            description: "erokemo??",
            details: oneLine`
                erokemo?????? idk
            `,
            examples: ["!erokemo"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        if (!message.channel.nsfw)
            return message.channel.send(
                "**:underage: NSFW Command. Please switch to NSFW channel in order to use this command.**"
            );

        const image = await nsfw.erokemo();

        message.say(image);
    }
};
