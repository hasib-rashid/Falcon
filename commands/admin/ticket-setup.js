const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class TicketSetupCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ticket-setup",
            aliases: [],
            group: "moderation",
            memberName: "ticket-setup",
            description: "Setup your ticket with this command",
            details: oneLine`
                Setup your ticket with this command
            `,
            examples: ["!ticket-setup <channel>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.channel.send(":no_entry: Insufficient permissions");

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle("Ticket")
            .setDescription("React with :ticket: for getting a Ticket!")
            .setFooter(
                "Warning! If you make a ticket without any reasons you will face punishments accourding to the act."
            )
            .setColor("GREEN");

        const messageSend = await message.channel.send(embed);

        messageSend.react("🎫");
    }
};
