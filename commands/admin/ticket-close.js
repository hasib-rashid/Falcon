const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

const { DiscordTicket } = require("discord_ticket_maker");
const ticket = new DiscordTicket();

module.exports = class TicketCloseCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ticket-close",
            aliases: [],
            group: "moderation",
            memberName: "ticket-close",
            description: "Close your current ticket using this command",
            clientPermissions: ["MANAGE_CHANNELS"],
            details: oneLine`
                Close your current ticket using this command
            `,
            examples: ["!ticket-close"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.channel.send(":no_entry: Insufficient Permissions");
        }

        if (message.channel.name.includes("make-"))
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
                files: [
                    {
                        name: "transcript.txt",
                        attachment: Buffer.from(content),
                    },
                ],
            });
            message.channel.send(
                `I have dmed you transcript if your dms are opened. Deleting channel in 10 seconds`
            );
            message.channel.send(
                `Just in case Your dms are closed here is transcript`
            );
            message.channel.send({
                files: [
                    {
                        name: "transcript.txt",
                        attachment: Buffer.from(content),
                    },
                ],
            });
        });
        setTimeout(function () {
            message.channel.delete();
        }, 10000);
    }
};
