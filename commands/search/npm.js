const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const moment = require("moment");
const request = require("node-superfetch");
const { trimArray } = require("../../util/Util");

module.exports = class NPMCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "npm",
            aliases: [],
            group: "search",
            memberName: "npm",
            description: "Search for any npm package over here",
            details: oneLine`
                Search for any npm package over here
            `,
            examples: ["!npm <package_name>"],
            credit: [
                {
                    name: "npm",
                    url: "https://www.npmjs.com/",
                    reason: "API",
                },
            ],
            args: [
                {
                    key: "pkg",
                    label: "package",
                    prompt:
                        "What package would you like to get information on?",
                    type: "string",
                    parse: (pkg) => encodeURIComponent(pkg),
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { pkg }) {
        try {
            const { body } = await request.get(
                `https://registry.npmjs.com/${pkg}`
            );
            if (body.time.unpublished)
                return msg.say("This package no longer exists.");
            const version = body.versions[body["dist-tags"].latest];
            const maintainers = trimArray(
                body.maintainers.map((user) => user.name)
            );
            const dependencies = version.dependencies
                ? trimArray(Object.keys(version.dependencies))
                : null;
            const embed = new Discord.MessageEmbed()
                .setColor(0xcb0000)
                .setAuthor(
                    "NPM",
                    "https://i.imgur.com/ErKf5Y0.png",
                    "https://www.npmjs.com/"
                )
                .setTitle(body.name)
                .setURL(`https://www.npmjs.com/package/${pkg}`)
                .setDescription(body.description || "No description.")
                .addField("❯ Version", body["dist-tags"].latest, true)
                .addField("❯ License", body.license || "None", true)
                .addField(
                    "❯ Author",
                    body.author ? body.author.name : "???",
                    true
                )
                .addField(
                    "❯ Creation Date",
                    moment.utc(body.time.created).format("MM/DD/YYYY h:mm A"),
                    true
                )
                .addField(
                    "❯ Modification Date",
                    moment.utc(body.time.modified).format("MM/DD/YYYY h:mm A"),
                    true
                )
                .addField("❯ Main File", version.main || "index.js", true)
                .addField(
                    "❯ Dependencies",
                    dependencies && dependencies.length
                        ? dependencies.join(", ")
                        : "None"
                )
                .addField("❯ Maintainers", maintainers.join(", "));
            return message.embed(embed);
        } catch (err) {
            if (err.status === 404)
                return msg.say("Could not find any results.");
            console.error(err);
        }
    }
};
