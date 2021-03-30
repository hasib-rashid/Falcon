const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "unlockdown",
            aliases: [],
            group: "moderation",
            memberName: "unlockdown",
            description: "Unlockdown the Server",
            details: oneLine`
                Unlockdown the Server
            `,
            examples: ["!unlockdown"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(
                "**You need `MANAGE_CHANNELS` permission to use this command**"
            );

        const role = message.guild.roles.everyone;

        const perms = role.permissions.toArray();

        perms.push("SEND_MESSAGES");
        await role.edit({ permissions: perms });

        message.channel.send(
            ":unlock: Unlocked the Server! Members can chat now!"
        );
    }
};
