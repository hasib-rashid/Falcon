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
    async run(message) {
        const leaderboard_users = await GuildUser.findAll({
            order: [
                ["rank", "DESC"]
            ]
        })

        console.log(leaderboard_users)
    }
}
