require("dotenv").config();

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const axios = require("axios").default;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "meme",
            aliases: [],
            group: "general",
            memberName: "meme",
            description: "Watch a meme",
            details: oneLine`
                Watch a meme
            `,
            examples: ["!meme"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const url = "https://some-random-api.ml/meme";

        axios.get(url).then(function (response) {
            message.channel.send(response.data.image);
        });
    }
};
