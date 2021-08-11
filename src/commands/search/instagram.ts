import Command from '../../typings/command';
import { default as axios } from 'axios'
import { MessageEmbed } from 'discord.js'
import { formatNumber } from '../../util/Util'

const InstagramCommand: Command = {
    name: 'instagram',
    description: 'Look at the ig of someone in Instagram',
    aliases: [
        'ig'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        axios.get(`https://instagram.com/${args[0]}/?__a=1`).then((res) => {
            const embed = new MessageEmbed()
                .setTitle(res.data.graphql.user.full_name)
                .setColor("#C13584")
                .setAuthor("Instagram", "https://brandpalettes.com/wp-content/uploads/2018/10/Instagram-300x300.png?ezimgfmt=ng:webp/ngcb1")
                .setThumbnail(res.data.graphql.user.profile_pic_url)
                .setDescription("**Bio:** " + res.data.graphql.user.biography)
                .addField("**ID: **", res.data.graphql.user.id, true)
                .addField("**Followers: **", formatNumber(res.data.graphql.user.edge_followed_by.count), true)
                .addField("**Following: **", formatNumber(res.data.graphql.user.edge_follow.count), true)
                .addField("**Category: **", res.data.graphql.user.category_name, true)
                .addField("Verfied", "**" + res.data.graphql.user.is_verified + "**", true)
                .addField("Private", "**" + res.data.graphql.user.is_private + "**", true)
                .addField("Useranme", "**" + res.data.graphql.user.username + "**", true)

            message.channel.send({ embeds: [embed] })
        })
    },
}

export default InstagramCommand;