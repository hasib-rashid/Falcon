const Discord = require("discord.js");
const math = require("mathjs");

const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class MathCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "math",
            aliases: [],
            group: "general",
            memberName: "math",
            description: "Do some basic Maths with this command",
            details: oneLine`
                Do some basic Maths with this command
            `,
            examples: ["!math 2 + 2"],
            args: [
                {
                    key: "args",
                    prompt: "What is the Operation you want to get?",
                    type: "string",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { args }) {
        let resp;

        try {
            resp = math.evaluate(args);
        } catch (e) {
            return message.channel.send("Please provide a **valid** question");
        }

        const embed = new Discord.MessageEmbed()
            .setColor(0x808080)
            .setTitle("Calculator")
            .addField("Question", `\`\`\`css\n${args}\`\`\``)
            .addField("Answer", `\`\`\`css\n${resp}\`\`\``);

        message.channel.send(embed);
    }
};
