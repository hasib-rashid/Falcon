const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class BanCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "ban",
            aliases: [],
            group: "moderation",
            memberName: "ban",
            description: "Bans a user you want to ban!",
            details: oneLine`
                Bans a user you want to ban!
            `,
            examples: ["!ban <user>"],
            clientPermissions: ["BAN_MEMBERS"],
            userPermissions: ["BAN_MEMBERS"],
            args: [
                {
                    key: "reason",
                    type: "string",
                    prompt: "Please specify the reason",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { reason }) {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS"))
                return message.channel.send(
                    ":no_entry: Insufficient permissions"
                );
            const member = message.mentions.members.first();

            if (!member)
                return message.channel.send(":no_entry: No user mentioned.");

            if (!member.kickable)
                return message.channel.send(
                    ":no_entry: I cannot ban this user."
                );
            if (member) {
                if (reason) {
                    member.ban().then((member) => {
                        const banned_embed = new Discord.MessageEmbed()
                            .setColor("RED")
                            .setTitle("Banned Succesfully!")
                            .setAuthor(`Banned by ${message.author.username}`)
                            .setDescription(
                                `${member.user.tag} was banned by ${message.author} for ${reason}.`
                            );
                        message.channel.send(banned_embed);
                    });
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
};
