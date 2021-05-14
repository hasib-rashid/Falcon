const Discord = require('discord.js')
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const canvacord = require("canvacord")
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

        const target = message.mentions.users.first() || message.guild.members.cache.get(user => user.id === query[0]) || message.author

        const username = target.nickname ? target.user.username : message.author.username

        GuildUser.findOne({ where: { userID: message.guild.members.cache.get(query[0]).user.id || target.id, guildID: message.guild.id } }).then((response) => {
            const rankCache = response.dataValues.rankCache

            const level = response.dataValues.level
            const requiredXP = 100 * level

            const RankCard = new canvacord.Rank()
                .setUsername(message.guild.members.cache.get(query[0]).user.username || username)
                .setRank(1)
                .setLevel(level)
                .setCurrentXP(rankCache)
                .setRequiredXP(requiredXP)
                .setAvatar(message.guild.members.cache.get(query[0]).user.displayAvatarURL({ dynamic: false, format: "png" }) || target.displayAvatarURL({ dynamic: false, format: "png" }))
                .setProgressBar("#3683ff", "COLOR")
                .setStatus(message.guild.members.cache.get(query[0]).user.presence.status || target.presence.status)
                .setDiscriminator(message.guild.members.cache.get(query[0]).user.discriminator || target.discriminator);

            RankCard.build()
                .then(data => {
                    const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                    message.channel.send(attachment);
                });
        })
    }
}
