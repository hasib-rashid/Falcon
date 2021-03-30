const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "deleterr",
            aliases: ["delete-rr", "delete-reaction-role"],
            group: "moderation",
            memberName: "deleterr",
            description: "Deletes a Reaction Role",
            details: oneLine`
                Deletes a Reaction Role
            `,
            examples: ["!delete <role> <emoji> <messageID>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            if (!message.member.hasPermission("MANAGE_ROLES"))
                return message.channel.send(
                    "**You need `MANAGE_ROLES` permission to use this command**"
                );

            const args = message.content.split(" ").slice(1);

            const emoji = args[0];
            if (!emoji)
                return message
                    .reply("You need use a valid emoji.")
                    .then((m) => m.delete({ timeout: 1000 }));

            const msg = await message.channel.messages.fetch(args[1]);
            if (!msg)
                return message
                    .reply("Message not found! Wtf...")
                    .then((m) => m.delete({ timeout: 1000 }));

            await this.client.reactionRole.deleteReactionRole({
                message: msg,
                emoji,
            });

            message.reply("Done").then((m) => m.delete({ timeout: 500 }));
        } catch (err) {
            message.channel.send(
                "**An unexpected Error Occured. Use the correct format: `deleteRR <emoji> <messageID>`**"
            );
        }
    }
};
