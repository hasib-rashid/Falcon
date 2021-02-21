const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class SomethingCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "test",
            aliases: [],
            group: "general",
            memberName: "test",
            description: "description",
            details: oneLine`
                description
            `,
            examples: ["example"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {}
};
