const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

const { DiscordTicket } = require("discord_ticket_maker");
const ticket = new DiscordTicket();

module.exports = class TicketCloseCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ticket-close",
            aliases: [],
            group: "general",
            memberName: "ticket-close",
            description: "Close your current ticket using this command",
            details: oneLine`
                Close your current ticket using this command
            `,
            examples: ["!ticket-close"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        if (message.channel.name.includes("make-"))
            return message.channel.send("You cannot use that here!");
        let channel = message.channel;
        channel.messages.fetch({ limit: 80 }).then(function (messages) {
            let content = messages
                .map((message) => message.content && message.content)
                .join("\n");
            message.author.send(
                `Transcript for your ticket in ${message.guild.name} Server`
            );
            message.author.send({
                files: [
                    {
                        name: "transcript.txt",
                        attachment: Buffer.from(content),
                    },
                ],
            });
            message.channel.send(
                `I have dmed you transcript if your dms are opened. Deleting channel in 10 seconds`
            );
            message.channel.send(
                `Just in case Your dms are closed here is transcript`
            );
            message.channel.send({
                files: [
                    {
                        name: "transcript.txt",
                        attachment: Buffer.from(content),
                    },
                ],
            });
        });
        setTimeout(function () {
            message.channel.delete();
        }, 10000);

        this.client.on(
            "messageReactionAdd",
            async (reaction, user, message) => {
                if (user.partial) await user.fetch();
                if (reaction.partial) await reaction.fetch();
                if (reaction.message.partial) await reaction.message.fetch();
                if (user.bot) return;

                let ticketid = await settings.get(
                    `${reaction.message.guild.id}-ticket`
                );

                if (!ticketid) return;

                if (
                    reaction.message.id == ticketid &&
                    reaction.emoji.name == "🎫"
                ) {
                    reaction.users.remove(user);

                    reaction.message.guild.channels
                        .create(`ticket-${user.username}`, {
                            permissionOverwrites: [
                                {
                                    id: user.id,
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                                },
                                {
                                    id: reaction.message.guild.roles.everyone,
                                    deny: ["VIEW_CHANNEL"],
                                },
                                {
                                    id: reaction.message.guild.roles.cache.find(
                                        (role) => role.name === "Patrol"
                                    ),
                                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                                },
                            ],
                            type: "text",
                        })
                        .then(async (channel) => {
                            channel.send(
                                `<@${user.id}>`,
                                new Discord.MessageEmbed()
                                    .setTitle("Welcome to your ticket!")
                                    .setDescription(
                                        "Support Team will be with you shortly"
                                    )
                                    .setColor("RANDOM")
                                    .addField(
                                        "**Links**",
                                        "**[Invite Me](https://discord.com/oauth2/authorize?client_id=745926398212046878&scope=bot&permissions=8) | " +
                                            "[Support Server](https://invite.gg/blacksheep)** | "
                                    )
                            );
                        });
                }
            }
        );
    }
};
