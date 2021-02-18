const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class TicketCloseCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ticket-close",
            aliases: [],
            group: "moderation",
            memberName: "ticket-close",
            description: "Close a ticket after finishing!",
            details: oneLine`
                Close a ticket after finishing!
            `,
            examples: ["!ticket-close"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        if (!message.channel.name.includes("make-tickets"))
            return message.channel.send("You cannot use that here!");
        let channel = message.channel;
        channel.messages.fetch({ limit: 80 }).then(function (messages) {
            let content = messages
                .map((message) => message.content && message.content)
                .join("\n");
            message.author.send(
                `Transcript for your ticket in ${message.guild.name} Server`
            );
            message.author.send({
                files: [{ name: "test.txt", attachment: Buffer.from(content) }],
            });
            message.channel.send(
                `I have dmed you transcript if your dms are opened. Deleting channel in 20 seconds`
            );
            message.channel.send(
                `Just in case Your dms are closed here is transcript`
            );
            message.channel.send({
                files: [{ name: "test.txt", attachment: Buffer.from(content) }],
            });
        });
        setTimeout(function () {
            message.channel.delete();
        }, 20000);
    }
};
