const Discord = require("discord.js");

module.exports = {
    name: "toggleNSFW",
    description: "add the Member",
    usage: "!toggleNSFW on/off",
    aliases: [],
    permissions: ["MANAGE_CHANNELS"],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    const channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]) ||
        message.channel;
    args.shift();

    if (channel.type !== "text")
        return message.channel.send(
            `${message.client.assets.emojis.error} You did not provide a Text Channel!`
        );
    const verification = await ReactVerify(
        message,
        `Are you sure you want to change ${channel} to ${
            channel.nsfw ? "Non-NSFW" : "NSFW"
        }?`
    );

    if (!verification)
        return message.channel.send(
            `${message.client.assets.emojis.checkmark} Cancelled the command successfully!`
        );

    if (channel.nsfw) {
        channel.setNSFW(
            false,
            args.join(" ") ||
                `Moderator: ${
                    message.author.tag
                } Time: ${new Date().toUTCString()}`
        );
    } else {
        channel.setNSFW(
            true,
            args.join(" ") ||
                `Moderator: ${
                    message.author.tag
                } Time: ${new Date().toUTCString()}`
        );
    }

    message.channel.send(
        `${message.client.assets.emojis.checkmark} Toggled NSFW Successfully!`
    );
};
