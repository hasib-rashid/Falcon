const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const { DiscordTicket } = require("discord_ticket_maker");
const ticket = new DiscordTicket();

module.exports = class TicketRoleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ticket-role",
            aliases: [],
            group: "moderation",
            memberName: "ticket-role",
            description:
                "Set the support role, that gets pinged when a new ticket is created!",
            details: oneLine`
                Set the support role, that gets pinged when a new ticket is created!
            `,
            examples: ["!ticket-role <role_you_want>"],
            args: [
                {
                    key: "role",
                    type: "role",
                    prompt: "Please specify the role!",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { role }) {
        ticket.setRole(message, role);
    }
};
