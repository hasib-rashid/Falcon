require("dotenv").config();

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const axios = require("axios").default;
const { shorten, formatNumber } = require("../../util/Util");
const moment = require("moment")

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
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        const args = message.content.split(" ").slice(1);

        if (!args) return message.channel.send("**Please Specify the username and the repo or just the username of the github profile you want. Example: `github {username}` or `github {username} {repo-name}`**")

        if (!args[1]) {
            axios.get(`https://api.github.com/users/${args[0]}`).then(function (response) {
                const userEmbed = new Discord.MessageEmbed()
                    .setAuthor("Github", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
                    .setDescription("**Description: **" + response.data.bio
                        ? shorten(response.data.bio)
                        : "No description.")
                    .setColor("#2577fa")
                    .setThumbnail(response.data.avatar_url)
                    .addFields(
                        { name: "Public Repositories", value: response.data.public_repos, inline: true },
                        { name: "Public Gists", value: response.data.public_gists, inline: true },
                        { name: "Followers", value: response.data.followers, inline: true },
                        { name: "Following", value: response.data.following, inline: true },
                        { name: "Created At", value: moment.utc(response.data.created_at).format("MM/DD/YYYY h:mm A"), inline: true },
                        { name: "Company", value: response.data.company, inline: true },
                        { name: "Website", value: response.data.blog, inline: true },
                        { name: "Location", value: response.data.location, inline: true },
                        { name: "Email", value: response.data.email, inline: true },
                        { name: "Profile", value: `[Link](${response.data.html_url})`, inline: true },
                        { name: "ID", value: response.data.id, inline: true },
                    )

                if (response.data.name === null) {
                    userEmbed.setTitle(response.data.login)
                } else {
                    userEmbed.setTitle(response.data.name)
                }

                message.channel.send(userEmbed)
                console.log(response.data)
            }).catch((err) => {
                return message.channel.send("**❌ Could not find results**")
            })
        }

        if (args[1]) {
            axios.get(`https://api.github.com/repos/${args[0]}/${args[1]}`).then(function (response) {
                console.log(response.data)
            })
        }
    }
};
