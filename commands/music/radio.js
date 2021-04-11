const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const radio = require("./radio-config.js");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "radio",
            aliases: [],
            group: "music",
            memberName: "radio",
            description: "Listen to any radio you want!",
            details: oneLine`
                Listen to any radio you want!
            `,
            examples: ["!radio Radio Furti"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const args = message.content.split(" ").slice(1);

        radio(this.client, message, args.join());
    }
};
