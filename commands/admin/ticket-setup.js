const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const enmap = require("enmap");

const settings = new enmap({
    name: "settings",
    autoFetch: true,
    cloneLevel: "deep",
    fetchAll: true,
});

module.exports = class TicketSetupCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ticket-setup",
            aliases: [],
            group: "moderation",
            memberName: "ticket-setup",
            description: "Setup your tickets",
            details: oneLine`
                Setup your tickets
            `,
            examples: ["!ticket-setup <channel_name>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.reply(`Become a admin BOOMER`);
        let channel = message.mentions.channels.first();
        if (!channel) return message.reply("Usage: `tt!ticket-setup #channel`");
        const rle = message.guild.roles.cache.find(
            (role) => role.name === "Patrol"
        );
        if (!rle)
            return message.reply(
                "Hmmm I coudl't find a role called `Patrol` Make sure you have a role called `Patrol` with same capitalisation and all you moderators are havingp it"
            );

        let sent = await channel.send(
            new Discord.MessageEmbed()
                .setTitle("Ticket System")
                .setDescription("React to open a ticket!")
                .setFooter("Ticket System")
                .setColor("00ff00")
        );

        sent.react("🎫");
        settings.set(`${message.guild.id}-ticket`, sent.id);

        message.channel.send("Ticket System Setup Done!");

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
