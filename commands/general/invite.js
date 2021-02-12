const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Finds the Invite link for the server",
    usage: "!invite",
    aliases: ["inv"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    message.channel.createInvite({ unique: true }).then((invite) => {
        message.channel.send(
            "**This Server's Invite Link** https://discord.gg/" + invite.code
        );
    });
    message.channel.send(
        "You can also invite me using this link [Here](http://example.com)"
    );
};
