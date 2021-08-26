import { CommandInteraction, MessageEmbed } from "discord.js";
import BaseSlashCommand from "../../base/BaseSlashCommand";
import Falcon from "../../base/Client";
import Discord from 'discord.js'
import osutils from 'os-utils'

export default class PingCommand extends BaseSlashCommand {
    constructor(client: Falcon) {
        super(client, {
            name: "invite",
            description: "Invite Falcon",
        });
    }

    public async run(interaction: CommandInteraction) {
        try {
            const embed = new Discord.MessageEmbed()
                .setTitle(this.client.user?.username)
                .setThumbnail(this.client.user?.displayAvatarURL() || "")
                .setFooter(interaction.user.username, interaction.user.displayAvatarURL())
                .addField("Guilds", `${this.client.guilds.cache.size}`, true)
                .addField("Users", `${this.client.users.cache.size}`, true)
                .addField("Latency", `${this.client.ws.ping} ms`, true)
                .addField("Library", `Discord v${Discord.version}`, true)
                .addField("Platform", `${osutils.platform()}`, true)
                .addField("No. of CPU", `${osutils.cpuCount()}`, true)
                .addField("Load Average", `${osutils.loadavg(5)}`, true)
                .addField("Total Memory", `${osutils.totalmem().toFixed(2)} MB`, true)
                .addField("Free Memory", `${osutils.freemem().toFixed(2)} MB`, true)
                .addField("RAM", `${process.memoryUsage().heapUsed / 1024 / 1024} %`, true)
                .setColor("BLUE");

            return interaction.editReply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
        }
    }
};