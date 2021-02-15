const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class InfoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "info",
            aliases: [],
            group: "misc",
            memberName: "info",
            description: "Get Information about CodeVert",
            details: oneLine`
                Get Information about CodeVert
            `,
            examples: ["!info"],
        });
    }

    /**
     *
     * @param {commando.CommandoMessage} message
     * @param {commando.CommandoClient} client
     */

    async run(message, client) {
        const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(
                message.author.username,
                message.author.displayAvatarURL()
            )
            .setDescription(
                "Thanks for using CodeVert! This bot is to make your life simple and fun! Enjoy the many features CodeVert has to offer like Moderating, Music, Games, Events, and more!"
            );

        message.channel.send(embed);
    }
};
