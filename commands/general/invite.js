const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Finds the Invite link for the server",
    usage: "!invite",
    aliases: ["inv"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    message.channel.createInvite({ unique: true }).then((invite) => {
        message.channel.send(
            "**This Server's Invite Link** https://discord.gg/" + invite.code
        );
    });
    message.channel.send(
        "Invite me to your server over here! \n`https://discord.com/api/oauth2/authorize?client_id=799543154692718602&permissions=8&scope=bot`"
    );
};
