const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

const djs = require("djs-economy");

module.exports = class BalanceCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "balance",
            aliases: ["bal"],
            group: "general",
            memberName: "balance",
            description: "Check your balance here!",
            details: oneLine`
                Check your balance here!
            `,
            examples: ["!bal"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        const check = await djs.GetCash(message.author.id);

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setColor("GREEN")
            .setTitle(`You have ${check.cash} points`)
            .setFooter("CodeVert Points System");
        message.channel.send(embed);
    }
};
