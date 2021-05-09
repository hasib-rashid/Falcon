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
        const rankModel = GuildUser.findOne({ where: { userID: message.author.id, guildID: message.guild.id } }).then((response) => {
            const rank = response.dataValues.rank
            message.channel.send(`Your xp is ${rank}`)
        })

    }
}
