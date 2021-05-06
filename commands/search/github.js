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
                const public_repos = response.data.public_repos || "None"
                const public_gists = response.data.public_gists || "None"
                const followers = response.data.followers || "None"
                const following = response.data.following || "None"
                const created_at = response.data.created_at
                const company = response.data.company || "No Comany"
                const website = response.data.blog || "No Website"
                const location = response.data.location || "No location Specified"
                const email = response.data.email || "No Email"
                const profile = response.data.html_url
                const id = response.data.id

                const userEmbed = new Discord.MessageEmbed()
                    .setAuthor("Github", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
                    .setDescription("**Description: **" + response.data.bio
                        ? shorten(response.data.bio)
                        : "No description.")
                    .setColor("#2577fa")
                    .setThumbnail(response.data.avatar_url)
                    .addFields(
                        { name: "Public Repositories", value: public_repos, inline: true },
                        { name: "Public Gists", value: public_gists, inline: true },
                        { name: "Followers", value: followers, inline: true },
                        { name: "Following", value: following, inline: true },
                        { name: "Created At", value: moment.utc(created_at).format("MM/DD/YYYY h:mm A"), inline: true },
                        { name: "Company", value: company, inline: true },
                        { name: "Website", value: website, inline: true },
                        { name: "Location", value: location, inline: true },
                        { name: "Email", value: email, inline: true },
                        { name: "Profile", value: `[Link](${profile})`, inline: true },
                        { name: "ID", value: id, inline: true },
                    )

                if (response.data.name === null) {
                    userEmbed.setTitle(response.data.login)
                } else {
                    userEmbed.setTitle(response.data.name)
                }

                message.channel.send(userEmbed)
            }).catch((err) => {
                return message.channel.send("**❌ Could not find results**")
            })
        }

        if (args[1]) {
            axios.get(`https://api.github.com/repos/${args[0]}/${args[1]}`).then(function (response) {
                const owner = response.data.owner.login || "None"
                const link = response.data.html_url || "None"
                const homepage = response.data.homepage || "No Homepage"
                const is_forked = response.data.fork || "No"
                const forks = response.data.forks || "None"
                const license = response.data.license ? response.data.license.name : "No License"
                const open_issues = response.data.open_issues || "No Issues"
                const default_branch = response.data.default_branch || "No Branches"
                const subscribers = response.data.subscribers_count || "No Subscribers"
                const archrived = response.data.archived
                const language = response.data.language || "No Language"
                const github_pages = response.data.has_pages
                const clone = response.data.clone_url
                const ssh = response.data.ssh_url
                const created_at = response.data.created_at
                const updated_at = response.data.updated_at || "Not Updated"
                const pushed_at = response.data.pushed_at || "Not Pushed"

                const repoEmbed = new Discord.MessageEmbed()
                    .setAuthor("Github", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
                    .setTitle(response.data.full_name)
                    .setDescription("**Description: **" + response.data.description || "No Description")
                    .setColor("#2577fa")
                    .setThumbnail(response.data.owner.avatar_url)
                    .addFields(
                        { name: "Owner", value: `[${owner}](${response.data.owner.html_url})`, inline: true },
                        { name: "Link", value: `[Repository](${link})`, inline: true },
                        { name: "Homepage", value: homepage, inline: true },
                        { name: "Fork?", value: is_forked, inline: true },
                        { name: "Fork Count", value: forks, inline: true },
                        { name: "License", value: license, inline: true },
                        { name: "Open Issues", value: open_issues, inline: true },
                        { name: "Default Branch", value: default_branch, inline: true },
                        { name: "Subscribers", value: subscribers, inline: true },
                        { name: "Archived?", value: archrived, inline: true },
                        { name: "Language", value: language, inline: true },
                        { name: "Github Pages?", value: github_pages, inline: true },
                        { name: "Clone URL", value: clone, inline: true },
                        { name: "SSH Url", value: ssh, inline: true },
                        { name: "Created At", value: moment.utc(created_at).format("MM/DD/YYYY h:mm A"), inline: false },
                        { name: "Updated At", value: moment.utc(updated_at).format("MM/DD/YYYY h:mm A"), inline: false },
                        { name: "Pushed At", value: moment.utc(pushed_at).format("MM/DD/YYYY h:mm A"), inline: true },
                    )

                message.channel.send(repoEmbed)
            }).catch((err) => {
                console.error(err)
                return message.channel.send("**❌ Could not find results**")
            })
        }
    }
};
