const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "simleave",
            aliases: [],
            group: "owner",
            memberName: "simleave",
            description: "Simulate Leave!",
            details: oneLine`
                Simulate Leave!
            `,
            examples: ["!simleave"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        if (!message.author.id === "548038495617417226")
            return message.channel.send(
                "**This command is only for the Owner: `Conqueror.js#1321`**"
            );

        this.client.emit("guildMemberRemove", message.member);
    }
};
