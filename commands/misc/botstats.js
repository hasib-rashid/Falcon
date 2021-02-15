const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

const os = require("os");
const osutils = require("os-utils");

module.exports = class BotStatsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "botstats",
            aliases: ["stats"],
            group: "misc",
            memberName: "botstats",
            description: "Check the Stats of the Bot",
            details: oneLine`
                Check the Stats of the Bot
            `,
            examples: ["!botstats", "!stats"],
        });
    }

    /**
     *
     * @param {commando.CommandoMessage} message
     * @param {commando.CommandoClient} client
     * @param {commando.CommandoGuild} guild
     * @param {commando}
     */

    async run(message, client, guild) {
        try {
            let embed = new Discord.MessageEmbed()
                .setTitle(message.client.user.username)
                .setThumbnail(message.client.user.displayAvatarURL())
                .setFooter(message.author.tag)
                .addFields(
                    {
                        name: "Guilds",
                        value: this.client.guilds.cache.size,
                        inline: true,
                    },
                    {
                        name: "Users",
                        value: this.client.users.cache.size,
                        inline: true,
                    },
                    {
                        name: "Latency",
                        value: this.client.ws.ping + "ms",
                        inline: true,
                    },
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
        } catch (err) {
            console.error(err);
        }
    }
};
