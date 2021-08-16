import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import moment from 'moment';
import { RunFunction } from '../../interfaces/Command';

export const name = 'github'
export const category = 'search'
export const description = 'Search All of Github'

export const run: RunFunction = async (client, message, args) => {
    if (args[1]) {
        axios.get(`https://api.github.com/repos/${args[0]}/${args[1]}`).then(function (response) {
            const repoEmbed = new MessageEmbed()
                .setAuthor("Github", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
                .setTitle(response.data.full_name)
                .setDescription("**Description: **" + response.data.description || "No Description")
                .setColor("#2577fa")
                .setThumbnail(response.data.owner.avatar_url)
                .addFields(
                    { name: "Owner", value: `[${response.data.owner.login}](${response.data.owner.html_url})`, inline: true },
                    { name: "Link", value: `[Repository](${response.data.html_url})`, inline: true },
                    { name: "Homepage", value: response.data.homepage || "None", inline: true },
                    { name: "Fork?", value: response.data.fork, inline: true },
                    { name: "Fork Count", value: response.data.forks || "None", inline: true },
                    { name: "License", value: response.data.license ? response.data.license.name : "No License", inline: true },
                    { name: "Open Issues", value: response.data.open_issues || "None", inline: true },
                    { name: "Default Branch", value: response.data.default_branch || "None", inline: true },
                    { name: "Subscribers", value: response.data.subscribers_count || "None", inline: true },
                    { name: "Archived?", value: response.data.archived || "None", inline: true },
                    { name: "Language", value: response.data.language || "None", inline: true },
                    { name: "Github Pages?", value: response.data.has_pages || "None", inline: true },
                    { name: "Clone URL", value: response.data.clone_url },
                    { name: "SSH Url", value: response.data.ssh_url },
                    { name: "Created At", value: moment.utc(response.data.created_at).format("MM/DD/YYYY h:mm A"), inline: false },
                    { name: "Updated At", value: moment.utc(response.data.updated_at).format("MM/DD/YYYY h:mm A"), inline: false },
                    { name: "Pushed At", value: moment.utc(response.data.pushed_at).format("MM/DD/YYYY h:mm A"), inline: true },
                )
            message.channel.send(repoEmbed)
        })
    }

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

            const userEmbed = new MessageEmbed()
                .setAuthor("Github", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
                .setDescription("**Description: **" + response.data.bio)
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
        })
    }
}