const { MessageEmbed } = require("discord.js");

module.exports = {
    id: "invite",
    aliases: ["inv", "invite"],
    channels: "any",
    exec: (client) => {
        let channel = client.message.channel;

        channel.createInvite({ unique: true }).then((invite) => {
            client.message.channel.send(
                "**This Server's Invite Link** https://discord.gg/" +
                    invite.code
            );
        });
    },
};
