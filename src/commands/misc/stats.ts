import Command from '../../constants/command';
import Discord from 'discord.js'
import os from 'os'
// @ts-ignore
import osutils from 'os-utils'

const StatsCommand: Command = {
    name: 'stats',
    description: 'Watch the latest stats of Falcon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            const embed = new Discord.MessageEmbed()
                .setTitle(message.client.user?.username)
                .setThumbnail(message.client.user?.displayAvatarURL() || "")
                .setFooter(message.author.tag)
                .addFields(
                    {
                        name: "Guilds",
                        value: client.guilds.cache.size,
                        inline: true,
                    },
                    {
                        name: "Users",
                        value: client.users.cache.size,
                        inline: true,
                    },
                    {
                        name: "Latency",
                        value: client.ws.ping + "ms",
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
                        value: "Number of CPU's: " + osutils.cpuCount(),
                    },
                    {
                        name: "Load Average",
                        value: "Load Average (5m): " + osutils.loadavg(5),
                        inline: true,
                    },
                    {
                        name: "Total Memory",
                        value:
                            "Total Memory: " +
                            osutils.totalmem().toFixed(2) +
                            " MB",
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
                )
                .setColor("BLUE");

            return message.channel.send(embed);
        } catch (err) {
            console.error(err);
        }
    },
}

export default StatsCommand;