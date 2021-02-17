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

        const WebDeveloper = "🖥️";
        const MobileDeveloper = "📱";
        const AIDeveloper = "🤖";
        const BotDeveloper = "✨";
        const PythonDeveloper = "🐍";
        const LibraryDeveloper = "📦";
        const APIDeveloper = "📰";
        const GameDeveloper = "🎮";

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setColor("GREEN")
            .setTitle("Get your roles here!")
            .setDescription(
                "**React to this message to get your roles! Programmer Based Roles**\n\n" +
                    `${WebDeveloper} for Web Developer\n\n` +
                    `${MobileDeveloper} for Mobile Developer\n\n` +
                    `${PythonDeveloper} for Python Developer\n\n` +
                    `${AIDeveloper} for AI Developer\n\n` +
                    `${APIDeveloper} for API Developer\n\n` +
                    `${LibraryDeveloper} for Library Developer\n\n` +
                    `${BotDeveloper} for Bot Developer\n\n` +
                    `${GameDeveloper} for Game Developer`
            )
            .setFooter("Reaction Roles in CodeVert");

        let messageEmbed = await message.channel.send(embed);

        messageEmbed.react(WebDeveloper);
        messageEmbed.react(MobileDeveloper);
        messageEmbed.react(PythonDeveloper);
        messageEmbed.react(AIDeveloper);
        messageEmbed.react(APIDeveloper);
        messageEmbed.react(LibraryDeveloper);
        messageEmbed.react(BotDeveloper);
        messageEmbed.react(AIDeveloper);
        messageEmbed.react(GameDeveloper);

        this.client.on("messageReactionAdd", async (reaction, user) => {
            try {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === WebDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("784029110513958927");
                    }

                    if (reaction.emoji.name === MobileDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811501292799262721");
                    }

                    if (reaction.emoji.name === PythonDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811501116583051274");
                    }

                    if (reaction.emoji.name === BotDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("784029110513958926");
                    }

                    if (reaction.emoji.name === LibraryDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("784029110513958929");
                    }

                    if (reaction.emoji.name === AIDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811497482835197953");
                    }

                    if (reaction.emoji.name === GameDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("784029110513958930");
                    }
                } else {
                    return;
                }
            } catch (err) {
                console.error(err);
            }
        });

        this.client.on("messageReactionRemove", async (reaction, user) => {
            try {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === WebDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("784029110513958927");
                    }

                    if (reaction.emoji.name === MobileDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811501292799262721");
                    }

                    if (reaction.emoji.name === PythonDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811501116583051274");
                    }

                    if (reaction.emoji.name === BotDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("784029110513958926");
                    }

                    if (reaction.emoji.name === LibraryDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("784029110513958929");
                    }

                    if (reaction.emoji.name === AIDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811497482835197953");
                    }

                    if (reaction.emoji.name === GameDeveloper) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("784029110513958930");
                    }
                } else {
                    return;
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
};
