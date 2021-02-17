const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ReactionRoleCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "rr",
            aliases: [],
            group: "moderation",
            memberName: "rr",
            description: "React to get your roles",
            details: oneLine`
                React to get your roles
            `,
            examples: ["!rr"],
            clientPermissions: ["MANAGE_ROLES"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        const channel = "810921429671477249";

        const ExperiencedProg = message.guild.roles.cache.find((role) => {
            role.name === "Experienced Programmer";
        });
        const NewbieProg = message.guild.roles.cache.find((role) => {
            role.name === "Newbie Programmer";
        });
        const CoderProg = message.guild.roles.cache.find((role) => {
            role.name === "Coder";
        });

        const ExperiencedProgEmoji = "😎";
        const NewbieProgEmoji = "😁";
        const CoderProgEmoji = "👍";

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setColor("GREEN")
            .setTitle("Get your roles here!")
            .setDescription(
                "React to this message to get your roles! Programmer Based Roles\n" +
                    `${ExperiencedProgEmoji} for Experienced Programmer\n` +
                    `${CoderProgEmoji} for Coder\n` +
                    `${NewbieProgEmoji} for Newbie Programmer`
            )
            .setFooter("Reaction Roles in CodeVert");

        let messageEmbed = await message.channel.send(embed);

        messageEmbed.react(ExperiencedProgEmoji);
        messageEmbed.react(CoderProgEmoji);
        messageEmbed.react(NewbieProgEmoji);

        this.client.on("messageReactionAdd", async (reaction, user) => {
            try {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === ExperiencedProgEmoji) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("784337017177374730");
                    }

                    if (reaction.emoji.name === CoderProgEmoji) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("785068591615180830");
                    }

                    if (reaction.emoji.name === NewbieProgEmoji) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("784337093257723924");
                    }
                } else {
                    return;
                }
            } catch (err) {
                console.error(err);
            }
        });

        this.client.on("messageReactionRemove", async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === ExperiencedProgEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove("784337017177374730");
                }

                if (reaction.emoji.name === CoderProgEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove("785068591615180830");
                }

                if (reaction.emoji.name === NewbieProgEmoji) {
                    await reaction.message.guild.members.cache
                        .get(user.id)
                        .roles.remove("784337093257723924");
                }
            } else {
                return;
            }
        });
    }
};
