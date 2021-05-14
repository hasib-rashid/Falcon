const Discord = require('discord.js')
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const GuildUser = require("../../models/GuildUser")

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'leaderboard',
            aliases: [],
            group: 'general',
            memberName: 'leaderboard',
            description: 'Check the leaderboard here!',
            details: oneLine`
                Check the leaderboard here!
            `,
            examples: ['!leaderboard'],
        })
    }

    /**
     * @param {commando.CommandoMessage} message
    */
    async run(message, err) {
        if (err) throw err;

        const leaderboard_users = await GuildUser.findAll({
            order: [
                ["rank", "DESC"]
            ],
            limit: 10
        })

        console.log(leaderboard_users.length)

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Leaderboard")
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
            .setTimestamp()

        for (var i = 0; i < leaderboard_users.length; ++i) {
            let fieldName;

            switch (i) {
                case 0:
                    fieldName = '🥇';
                    break;
                case 1:
                    fieldName = '🥈';
                    break;
                case 2:
                    fieldName = '🥉';
                    break;
                default:
                    fieldName = `${i + 1}th`;
            }

            var result = leaderboard_users[i].dataValues;
            embed.addField(`${fieldName} - <@${message.guild.members.cache.get(`${result.userID}`).user.id}>`, `${result.rank}`)
        }

        message.channel.send(embed)
    }
}
