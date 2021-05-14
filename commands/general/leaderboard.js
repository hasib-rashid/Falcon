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

        if (leaderboard_users.length === 0) return message.channel.send("**Currently there is no people on the leaderboard! Start chatting to gain XP and be on the leaderboard**")

        console.log(leaderboard_users.length)

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Ranking Leaderboard")
            .setColor("#2784f5")
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
            .setTimestamp()

        let desc = [];

        for (var i = 0; i < leaderboard_users.length; ++i) {
            let fieldName = {};

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
                case (!0):
                    message.channel.send("**There is nobody on the leaderboard! Start chatting to be one!**")
                case (!1):
                    break;
                case (!2):
                    break;
                default:
                    fieldName = `${i + 1}th`;
            }

            var result = leaderboard_users[i].dataValues;
            desc.push(`**${fieldName} - <@${message.guild.members.cache.get(`${result.userID}`).user.id}> • Level ${result.level}** \n`)
        }

        embed.setDescription(desc)

        message.channel.send(embed)
    }
}
