const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const translate = require("@vitalets/google-translate-api");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "translate",
            aliases: [],
            group: "general",
            memberName: "translate",
            description: "Translate things from one language to another",
            details: oneLine`
                Translate things from one language to another
            `,
            examples: ["!translate"],
            args: [
                {
                    key: "args",
                    type: "string",
                    prompt: "Please Specify what should I translate",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message, { args }) {
        translate(args, { to: "en" })
            .then((res) => {
                message.channel.send(res.text);
                //=> I speak English
                message.channel.send(
                    "translated from: " + res.from.language.iso
                );
                //=> nl
            })
            .catch((err) => {
                console.error(err);
            });
    }
};
