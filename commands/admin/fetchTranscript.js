const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const { fetchTranscript } = require("reconlx");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "fetch-transcript",
            aliases: [],
            group: "moderation",
            memberName: "fetch-transcript",
            description: "Fetch the transcript of a channel",
            details: oneLine`
                Fetch the transcript of a channel
            `,
            examples: ["!fetchTranscript <number_of_messages>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            if (!message.member.hasPermission("MANAGE_MESSAGES"))
                return message.channel.send(
                    "**You need `MANAGE_MESSAGES` permission to use this command**"
                );

            const args = message.content.split(" ").slice(1);

            if (!args)
                return message.channel.send(
                    "**Number of Messages is not specified**"
                );

            fetchTranscript(message, parseInt(args[0])).then((data) => {
                const file = new Discord.MessageAttachment(data, "index.html");
                message.channel.send(file);
            });
        } catch (err) {
            message.channel.send(
                "**Please use the correct format. `fetch-transcript <number_of_messages_you_want>`**"
            );
        }
    }
};
