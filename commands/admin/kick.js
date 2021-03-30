const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class KickCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "kick",
            aliases: [],
            group: "moderation",
            memberName: "kick",
            description: "Kick the user you want",
            details: oneLine`
                Kick the user you want
            `,
            examples: ["!kick <member>"],
            args: [
                {
                    key: "reason",
                    type: "string",
                    prompt: "Please specify the reason!",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { reason }) {
        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.channel.send(
                "**You need `KICK_MEMBERS` permission to use this command**"
            );

        const member = message.mentions.members.first();

        if (!member)
            return message.channel.send(":no_entry: No user mentioned.");
        if (!member.kickable)
            return message.channel.send(":no_entry: I cannot kick this user.");
        if (member) {
            if (reason) {
                member.kick().then((member) => {
                    const banned_embed = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle("Kicked Succesfully!")
                        .setAuthor(`Kicked by ${message.author.username}`)
                        .setDescription(
                            `${member.user.tag} was kicked by ${message.author} for ${reason}.`
                        );
                    message.channel.send(banned_embed);
                });
            }
        }
    }
};
