const Discord = require("discord.js");
const pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(
    ""
);
const { stripIndents } = require("common-tags");

module.exports = {
    name: "nitro-generat",
    description: "Plays a game of Rock Paper and Scissors",
    usage: "!nitro-generate",
    aliases: ["nitro"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    let str = "";

    for (let i = 0; i < 16; i++) {
        str += pool[Math.floor(Math.random() * pool.length)];
    }

    const NitroGeneratedEmbed = new Discord.MessageEmbed(
        message.author,
        "GREEN"
    )
        .setTitle("Nitro Generator")
        .setDescription(
            stripIndents`
				An Unchecked Nitro Link has been generated! Click [here](https://discord.gift/${str}) to check it out!
			`
        )
        .setThumbnail(
            "https://tenor.com/view/discord-nitro-upgrade-gif-wumpus-gif-13300784"
        )
        .setFooter(
            "Warning: There is only 3.26% chance that the Nitro code will work"
        );

    message.channel.send(NitroGeneratedEmbed);
};
