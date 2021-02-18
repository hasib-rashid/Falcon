const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");
const axios = require("axios").default;

module.exports = class IPCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "facts",
            aliases: ["fact"],
            group: "moderation",
            memberName: "facts",
            description: "Get a Random fact with this command",
            details: oneLine`
                Get a Random fact with this command
            `,
            examples: ["!ip <website> or !ip <any_ip_adress>"],
            credit: [
                {
                    name: "Useless Facts API",
                    url: "https://uselessfacts.jsph.pl/random.json",
                    reason: "API",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        try {
            const { body } = await request.get(
                `https://uselessfacts.jsph.pl/random.json`
            );
            message.channel.send(body.text);
        } catch (err) {
            console.error(err);
        }
    }
};
