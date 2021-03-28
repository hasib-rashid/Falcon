const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "createrr",
            aliases: ["create-rr", "create-reaction-role"],
            group: "moderation",
            memberName: "createrr",
            description: "Create a Reaction Role",
            details: oneLine`
                Create a Reaction Role
            `,
            examples: ["!createRR <role> <emoji> <messageID>"],
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

            const role = message.mentions.roles.first();
            if (!role)
                return message
                    .reply("You need mention a role")
                    .then((m) => m.delete({ timeout: 1000 }));

            const emoji = args[1];
            if (!emoji)
                return message
                    .reply("You need use a valid emoji.")
                    .then((m) => m.delete({ timeout: 1000 }));

            const msg = await message.channel.messages.fetch(
                args[2] || message.id
            );
            if (!role)
                return message
                    .reply("Message not found! Wtf...")
                    .then((m) => m.delete({ timeout: 1000 }));

            this.client.reactionRole.createReactionRole({
                message: msg,
                roles: [role],
                emoji,
                type: 1,
            });

            message.reply("Done").then((m) => m.delete({ timeout: 500 }));
        } catch (err) {
            message.channel.send("**An unexpected Error Occured**");
        }
    }
};
