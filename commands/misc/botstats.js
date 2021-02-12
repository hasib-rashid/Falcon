const Discord = require("discord.js");
const osutils = require("os-utils");

module.exports = {
    name: "botstats",
    description: "Displays the bot stats.",
    usage: "botstats",
    aliases: ["stats"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    let embed = new Discord.MessageEmbed()
        .setTitle(bot.user.username)
        .setThumbnail(bot.user.displayAvatarURL())
        .setFooter(bot.config.credits)
        .setColor(bot.config.color)
        .addFields(
            { name: "Guilds", value: bot.guilds.cache.size, inline: true },
            { name: "Users", value: bot.users.cache.size, inline: true },
            { name: "Latency", value: bot.ws.ping + "ms", inline: true },
            {
                name: "Library",
                value: "Discord.js V" + Discord.version,
                inline: true,
            },
            {
                name: "Platform",
                value: "Platform" + osutils.platform(),
                inline: true,
            },
            {
                name: "Number Of CPU",
                value: "Number of CPU's " + osutils.cpuCount(),
            },
            {
                name: "Load Average",
                value: "Load Average (5m): " + osutils.loadavg(5),
                inline: true,
            },
            {
                name: "Total Memory",
                value: "Total Memory: " + osutils.totalmem() + " MB",
                inline: true,
            },
            {
                name: "Free Memory",
                value: "Free Memory: " + osutils.freemem() + " MB",
            },
            {
                name: "Platform",
                value: "Platform: " + osutils.platform(),
                inline: true,
            },
            {
                name: "RAM",
                value:
                    "RAM Usage " +
                    process.memoryUsage().heapUsed / 1024 / 1024 +
                    "%",
                inline: true,
            },
            {
                name: "CPU Usage",
                value: "CPU Usage: " + "14.549609 MB",
            }
        );

    return message.channel.send(embed);
};
