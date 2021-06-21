import Command from '../../constants/command';
import { default as axios } from 'axios'
import moment from 'moment'
import { MessageEmbed } from 'discord.js'

const GithubCommand: Command = {
    name: 'github',
    description: 'Check anyones github with this command',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
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
    },
}

export default GithubCommand;