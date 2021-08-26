import { CommandInteraction, MessageEmbed } from "discord.js";
import { version as djsVersion } from 'discord.js'
import { UtilsManager } from '../../util/Utils';
const { formatNumber } = UtilsManager.prototype
import { version, dependencies } from '../../../package.json'

const deps = { ...dependencies };

import BaseSlashCommand from "../../base/BaseSlashCommand";
import Falcon from "../../base/Client";

export default class PingCommand extends BaseSlashCommand {
    constructor(client: Falcon) {
        super(client, {
            name: "info",
            description: "Information About Falcon",
        });
    }

    public async run(interaction: CommandInteraction) {
        try {
            // @ts-ignore
            let totalSeconds = (this.client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            const uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(
                    interaction.user.username,
                    interaction.user.displayAvatarURL()
                )
                .setDescription(
                    "Thanks for using Falcon! This bot is to make your life simple and fun! Enjoy the many features CodeVert has to offer like Moderating, Music, Games, Events, and more!"
                )
                .setColor("GREEN")
                .setFooter("©2021 Conqueror.js#3091 | Hasib Al Rashid")
                .addField("❯ Owner", "Conqueror.js#3091", true)
                .addField(
                    "❯ Servers",
                    formatNumber(`${this.client.guilds.cache.size}`),
                    true
                )
                .addField(
                    "❯ Shards",
                    formatNumber(`${this.client.shard?.count}`),
                    true
                )
                .addField(
                    "❯ Home Server",
                    "[CodeFiction](https://discord.gg/KbfyRFtGcD)",
                    true
                )
                .addField(
                    "❯ Invite",
                    "[Invite Falcon](https://discord.com/api/oauth2/authorize?client_id=799543154692718602&permissions=8&scope=bot)",
                    true
                )
                .addField("❯ Source Code", "N/A", true)
                .addField(
                    "❯ Uptime",
                    uptime,
                    true
                )
                .addField("❯ Version", `v${version}`, true)
                .addField("❯ Node.js", process.version, true)
                .addField("❯ Discord.js", `v${djsVersion}`, true)
                .addField(
                    "❯ Dependencies",
                    Object.keys(deps).sort().join(", ")
                );

            interaction.editReply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
        }
    }
};