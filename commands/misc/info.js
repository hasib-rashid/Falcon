const { MessageEmbed, version: djsVersion } = require("discord.js");
const commando = require("discord.js-commando");
const { version: commandoVersion } = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const { formatNumber, embedURL } = require("../../util/Util");
const {
    version,
    dependencies,
    optionalDependencies,
} = require("../../package.json");
const deps = { ...dependencies, ...optionalDependencies };
const copyright = require("../../assets/JSON/copyright.json");
const moment = require("moment");
require("moment-duration-format");

module.exports = class InfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "info",
            aliases: [],
            group: "misc",
            memberName: "info",
            description: "Get Information about CodeVert",
            details: oneLine`
                Get Information about CodeVert
            `,
            examples: ["!info"],
        });
    }

    /**
     *
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        try {
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setDescription(
                    "Thanks for using FalconX! This bot is to make your life simple and fun! Enjoy the many features CodeVert has to offer like Moderating, Music, Games, Events, and more!"
                )
                .setColor("GREEN")
                .setFooter(copyright.join("\n"))
                .addField("❯ Owner", "TheMegaWarrior#3647", true)
                .addField(
                    "❯ Servers",
                    formatNumber(this.client.guilds.cache.size),
                    true
                )
                .addField(
                    "❯ Commands",
                    formatNumber(this.client.registry.commands.size),
                    true
                )
                .addField(
                    "❯ Shards",
                    formatNumber(this.client.options.shardCount),
                    true
                )
                .addField(
                    "❯ Home Server",
                    "[CodeFiction](https://discord.gg/X2dDeENmJh)",
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
                    moment.duration(this.client.uptime).format("d:hh:mm:ss"),
                    true
                )
                .addField("❯ Version", `v${version}`, true)
                .addField("❯ Node.js", process.version, true)
                .addField("❯ Discord.js", `v${djsVersion}`, true)
                .addField("❯ Commando", `v${commandoVersion}`, true)
                .addField(
                    "❯ Dependencies",
                    Object.keys(deps).sort().join(", ")
                );

            message.channel.send(embed);
        } catch (err) {
            console.error(err);
        }
    }
};
