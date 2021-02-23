require("dotenv").config();

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");
const moment = require("moment");
const { shorten, formatNumber } = require("../../util/Util");

module.exports = class GithubCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "github",
            aliases: [],
            group: "search",
            memberName: "github",
            description: "Watch what is at github right now",
            details: oneLine`
                Watch what is at github right now
            `,
            examples: ["!github <user> <repo_name>"],
            credit: [
                {
                    name: "GitHub",
                    url: "https://github.com/",
                    reason: "API",
                    reasonURL: "https://developer.github.com/v3/",
                },
            ],
            args: [
                {
                    key: "author",
                    prompt: "Who is the author of the repository?",
                    type: "string",
                    parse: (author) => encodeURIComponent(author),
                },
                {
                    key: "repository",
                    prompt: "What is the name of the repository?",
                    type: "string",
                    parse: (repository) => encodeURIComponent(repository),
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { author, repository }) {
        try {
            const { body } = await request
                .get(`https://api.github.com/repos/${author}/${repository}`)
                .set({
                    Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
                });
            const embed = new Discord.MessageEmbed()
                .setColor(0xffffff)
                .setAuthor(
                    "GitHub",
                    "https://i.imgur.com/e4HunUm.png",
                    "https://github.com/"
                )
                .setTitle(body.full_name)
                .setURL(body.html_url)
                .setDescription(
                    body.description
                        ? shorten(body.description)
                        : "No description."
                )
                .setThumbnail(body.owner.avatar_url)
                .addField("❯ Stars", formatNumber(body.stargazers_count), true)
                .addField("❯ Forks", formatNumber(body.forks), true)
                .addField("❯ Issues", formatNumber(body.open_issues), true)
                .addField("❯ Language", body.language || "???", true)
                .addField(
                    "❯ Creation Date",
                    moment.utc(body.created_at).format("MM/DD/YYYY h:mm A"),
                    true
                )
                .addField(
                    "❯ Modification Date",
                    moment.utc(body.updated_at).format("MM/DD/YYYY h:mm A"),
                    true
                );
            return message.embed(embed);
        } catch (err) {
            if (err.status === 404)
                return message.say("Could not find any results.");
            return message.reply(
                `Oh no, an error occurred: \`${err.message}\`. Try again later!`
            );
        }
    }
};
