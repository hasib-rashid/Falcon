const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");

module.exports = class PuppyCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "puppy",
            aliases: ["dog", "doggo"],
            group: "general",
            memberName: "puppy",
            description: "Watch a pic of a sweet Puppy! Awwww",
            details: oneLine`
                Watch a pic of a sweet Puppy! Awwww
            `,
            examples: ["!puppy"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        try {
            const { body } = await request.get(
                "https://dog.ceo/api/breeds/image/random"
            );

            message.channel.send(body.message);
        } catch (err) {
            console.error(err);
        }
    }
};
