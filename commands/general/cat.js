const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class CatCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "cat",
            aliases: [],
            group: "general",
            memberName: "cat",
            description: "Get a Pic of an adorable cat!",
            details: oneLine`
                Get a Pic of an adorable cat!
            `,
            examples: ["!cat"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {}
};
