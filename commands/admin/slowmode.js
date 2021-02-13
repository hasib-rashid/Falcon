const Discord = require("discord.js");

module.exports = {
    name: "slow",
    description: "Enable the Slowmode in the channel",
    usage: "!slow <number_of_seconds>",
    aliases: ["slowmode", "slow_mode", "slow-mode"],
    permissions: ["MANAGE_CHANNELS"],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    const { channel } = message;

    if (args.length < 2) {
        message.channel.send(
            "Please provide a duration and a reason. For example: ` !slow 60 People are spamming `"
        );
        return;
    }

    let duration = args.shift().toLowerCase();
    if (duration === "off") {
        duration = 0;
    }

    if (isNaN(duration)) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor("RANDOM")
            .setDescription(
                'Please provide either a number of seconds or the word "off"'
            )
            .setThumbnail(
                "https://i.pinimg.com/originals/3f/82/40/3f8240fa1d16d0de6d4e7510b43b37ba.gif"
            )
            .setFooter("CodeVert 2021");

        message.channel.send(embed);
        return;
    }

    channel.setRateLimitPerUser(duration, args.join(" "));

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(
            `The slowmode for this channel "${message.channel.name}" was successfully set to ${duration}`
        )
        .setThumbnail(
            "https://i.pinimg.com/originals/3f/82/40/3f8240fa1d16d0de6d4e7510b43b37ba.gif"
        )
        .setFooter("CodeVert 2021");

    message.reply(embed);
};
