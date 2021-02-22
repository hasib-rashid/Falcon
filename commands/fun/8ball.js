const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const json = require("../../assets/JSON/8ball.json");

module.exports = class EightBallCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "8ball",
            aliases: [],
            group: "general",
            memberName: "8ball",
            description: "fun",
            details: oneLine`
                8ball is here to answer your question!
            `,
            examples: ["!8ball <your_question>"],
            args: [
                {
                    key: "response",
                    type: "string",
                    prompt: "Please give me a question to answer to!",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { response }) {
        const randomIndex = Math.floor(Math.random() * json.length);

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle("8ball")
            .addField(":grey_question:", response)
            .addField(":8ball:", json[randomIndex])
            .setColor("GREEN");

        message.channel.send(embed);
    }
};
