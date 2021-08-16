import { RunFunction } from '../../interfaces/Command'; 
import Discord from 'discord.js'
import osutils from 'os-utils'

export const name = 'stats'
export const category = 'misc'
export const description = 'Check the statistics of Falcon'
export const aliases = ["statistics"]

export const run: RunFunction = async (client, message, args) => {
    try {
        const embed = new Discord.MessageEmbed()
            .setTitle(message.client.user?.username)
            .setThumbnail(message.client.user?.displayAvatarURL() || "")
            .setFooter(message.author.tag)
            .addField("Guilds", `${client.guilds.cache.size}`, true)
            .addField("Users", `${client.users.cache.size}`, true)
            .addField("Latency", `${client.ws.ping} ms`, true)
            .addField("Library", `Discord v${Discord.version}`, true)
            .addField("Platform", `${osutils.platform()}`, true)
            .addField("No. of CPU", `${osutils.cpuCount()}`, true)
            .addField("Load Average", `${osutils.loadavg(5)}`, true)
            .addField("Total Memory", `${osutils.totalmem().toFixed(2)} MB`, true)
            .addField("Free Memory", `${osutils.freemem().toFixed(2)} MB`, true)
            .addField("RAM", `${process.memoryUsage().heapUsed / 1024 / 1024} %`, true)
            .setColor("BLUE");

        return message.channel.send(embed);
    } catch (err) {
        console.error(err);
    }
}