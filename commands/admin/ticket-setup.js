const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const enmap = require("enmap");

module.exports = class TicketSetupCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ticket-setup",
            aliases: [],
            group: "moderation",
            memberName: "ticket-setup",
            description: "Set up the Ticket System here!",
            details: oneLine`
                Set up the Ticket System here!
            `,
            examples: ["!ticket-setup"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        const settings = new enmap({
            name: "settings",
            autoFetch: true,
            cloneLevel: "deep",
            fetchAll: true,
        });

        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.reply(`Become a admin BOOMER`);
        let channel = message.mentions.channels.first();
        if (!channel) return message.reply("Usage: `!ticket-setup #channel`");
        const rle = message.guild.roles.cache.find(
            (role) => role.name === "Ticketed"
        );
        if (!rle)
            return message.reply(
                "Hmmm I coudl't find a role called `Ticketed` Make sure you have a role called `Patrol` with same capitalisation and all you moderators are havingp it"
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
                                        "Support Team will be with you shortly. Warning! If you take a ticket without any reason then you will get punished according to the act!"
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
