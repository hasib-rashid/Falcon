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
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.channel.send(":no_entry: Insufficient permissions");
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send(":no_entry: No user mentioned.");
        const reason = args.slice(1).join(" ");
        if (!member.kickable)
            return message.channel.send(":no_entry: I cannot kick this user.");
        if (member) {
            if (!reason) {
                return member.kick().then((member) => {
                    const kicked_embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Kicked Succesfully!")
                        .setAuthor(`Kicked by ${message.author.username}`)
                        .setDescription(
                            `${member.user.tag} was kicked by ${message.author}, no reason was provided.`
                        );
                    message.channel.send(kicked_embed);
                });
            }
            if (reason) {
                member.kick().then((member) => {
                    const banned_embed = new Discord.MessageEmbed()
                        .setColor("RANDOM")
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
