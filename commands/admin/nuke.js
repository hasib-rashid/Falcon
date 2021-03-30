const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class NukeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "nuke",
            aliases: [],
            group: "moderation",
            memberName: "nuke",
            description: "Nuking the channel for a full fresh channel!",
            details: oneLine`
                Nuking the channel for a full fresh channel!
            `,
            examples: ["!nuke"],
            userPermissions: ["MANAGE_CHANNELS"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send(
                "**You need `MANAGE_MESSAGES` permission to use this command**"
            );

        message.channel.clone().then((channel) => {
            channel.setPosition(message.channel.position);
            channel.send(
                "Successfully Nuked this channel! \nhttps://media2.giphy.com/media/oe33xf3B50fsc/giphy.gif"
            );
        });
        message.channel.delete();
    }
};
