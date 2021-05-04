const Discord = require("discord.js");
const { confirmation } = require("reconlx")
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

    async run(message) {
        try {
            const reason = message.content.split(" ").slice(2);

            if (!message.member.hasPermission("KICK_MEMBERS"))
                return message.channel.send(
                    "**You need `KICK_MEMBERS` permission to use this command**"
                );

            const targetUser = message.mentions.members.first() || (await message.guild.members.fetch('133990844666609664'))

            const confirmEmbed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle("Kicking A User")
                .setColor("#ff2424")
                .setDescription(`**Are you sure you want to kick  ${targetUser}\n\nReason:  \`${reason.join(" ")}\`\n\n This Action is irreversable.\n\n React with ✅ if you want to kick this user. And react with ❌ if you want to cancel this request.\n You have 30 seconds to apply the command.**`)
                .setFooter(message.client.user.username, message.client.user.displayAvatarURL())

            message.channel.send(confirmEmbed).then(async (msg) => {
                const emoji = await confirmation(msg, message.author, ["✅", "❌"], 30000);

                if (emoji === "✅") {
                    targetUser.kick({ reason: reason.join(" ") }).then((member) => {
                        const kickedEmbed = new Discord.MessageEmbed()
                            .setColor("GREEN")
                            .setTitle("Kicked Succesfully!")
                            .setAuthor(`Kicked by ${message.author.username}`)
                            .setDescription(
                                `${member.user.tag} was kicked by ${message.author} for ${reason}.`
                            );
                        message.channel.send(kickedEmbed);
                    });
                }
                if (emoji === "❌") {
                    message.channel.send("✅Cancelled The Command.")
                }
            })
        } catch (err) {
            console.error(err);
        }
    }
};
