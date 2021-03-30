const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "member-count",
            aliases: ["membercount", "user-count", "usercount"],
            group: "general",
            memberName: "member-count",
            description: "Counts all the number of members in the server",
            details: oneLine`
                Counts all the number of members in the server
            `,
            examples: ["!member-count"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setTitle("Number of Users: " + message.guild.memberCount)
            .setColor("GREEN");

        message.channel.send(embed);
    }
};
