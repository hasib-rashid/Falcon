const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "lockdown",
            aliases: [],
            group: "moderation",
            memberName: "lockdown",
            description: "Lock down the server on any raid or on any occasions",
            details: oneLine`
                Lock down the server on any raid or on any occasions
            `,
            examples: ["!lockdown"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(":no_entry: Insufficient Permissions");

        const role = message.guild.roles.everyone;

        const perms = role.permissions.toArray();

        const newPerms = perms.filter((perm) => perm !== "SEND_MESSAGES");

        await role.edit({ permissions: newPerms });

        message.channel.send(
            ":lock: Locked down the Server! Use `lockdown false` command to Unlock the Lockdown!"
        );
    }
};
