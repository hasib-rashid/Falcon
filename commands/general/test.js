const Discord = require('discord.js')
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const GuildUser = require("../../models/GuildUser")

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'test',
            aliases: [],
            group: 'general',
            memberName: 'test',
            description: 'Testing',
            details: oneLine`
                Testing
            `,
            examples: ['!test'],
        })
    }

    /**
     * @param {commando.CommandoMessage} message
    */
    async run(message) {
        GuildUser.update({ rank: 1000000 }, { where: { userID: message.author.id, guildID: message.guild.id } })

        message.channel.send("Successfully stored in database.")
    }
}
