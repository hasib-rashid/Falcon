const Discord = require('discord.js')
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const GuildUser = require("../../models/GuildUser")

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'rank',
            aliases: [],
            group: 'general',
            memberName: 'rank',
            description: 'Check your xp and rank here',
            details: oneLine`
                Check your xp and rank here
            `,
            examples: ['!rank'],
        })
    }

    /**
     * @param {commando.CommandoMessage} message
    */
    async run(message) {
        const query = message.content.split(" ").slice(1);

        const target = message.mentions.users.first() || message.guild.members.cache.get(query.join(" "))

        console.log(target.username)

        GuildUser.findOne({ where: { userID: target.id, guildID: message.guild.id } }).then((response) => {
            const rank = response.dataValues.rank
            message.channel.send(`${target.nickname || target.user.username || target.username}'s xp is ${rank}`)

            if (!target) {
                message.channel.send(`${message.author.username}'s xp is ${rank}`)
            }
        })
    }
}
