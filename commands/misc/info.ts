require("moment-duration-format")

import Command from '../../constants/command';
import { MessageEmbed, version as djsVersion } from 'discord.js'
import { formatNumber } from '../../util/Util';
import { totalCommands } from '../../classes/client'
import { version, dependencies } from '../../package.json'
import moment from 'moment'

const deps = { ...dependencies };

const InfoCommand: Command = {
    name: 'info',
    description: 'All the Information about the bot',
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
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setDescription(
                    "Thanks for using CodeVert! This bot is to make your life simple and fun! Enjoy the many features CodeVert has to offer like Moderating, Music, Games, Events, and more!"
                )
                .setColor("GREEN")
                .setFooter(copyright.join("\n"))
                .addField("❯ Owner", "TheMegaWarrior#3647", true)
                .addField(
                    "❯ Servers",
                    formatNumber(`${client.guilds.cache.size}`),
                    true
                )
                .addField(
                    "❯ Commands",
                    formatNumber(totalCommands),
                    true
                )
                .addField(
                    "❯ Shards",
                    formatNumber(`${client.shard?.count}`),
                    true
                )
                .addField(
                    "❯ Home Server",
                    "[CodeFiction](https://discord.gg/KbfyRFtGcD)",
                    true
                )
                .addField(
                    "❯ Invite",
                    "[Invite CodeVert](https://discord.com/api/oauth2/authorize?client_id=799543154692718602&permissions=8&scope=bot)",
                    true
                )
                .addField("❯ Source Code", "N/A", true)
                .addField(
                    "❯ Uptime",
                    moment.duration(client.uptime).format("d:hh:mm:ss"),
                    true
                )
                .addField("❯ Version", `v${version}`, true)
                .addField("❯ Node.js", process.version, true)
                .addField("❯ Discord.js", `v${djsVersion}`, true)
                .addField(
                    "❯ Dependencies",
                    Object.keys(deps).sort().join(", ")
                );

            message.channel.send(embed);
        } catch (err) {
            console.error(err);
        }
    },
}

export default InfoCommand;