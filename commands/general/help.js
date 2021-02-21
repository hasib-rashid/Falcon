const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const fs = require("fs");

const {
    General,
    Games,
    Moderation,
    Music,
    Events,
    Notify,
    NSFW,
    MISC,
    Fun,
    Search,
} = require("../../JSON/help.json");

module.exports = class HelpCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: [],
            group: "general",
            memberName: "help",
            description: "Get all the features and help with 1 command!",
            details: oneLine`
                Get all the features and help with 1 command!
            `,
            examples: ["!help"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        try {
            let PREFIX = "!";
            const args = message.content.slice(5).trim().split("  ");
            const helpArgs = args.shift().toLowerCase();

            if (helpArgs === "general") {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle(":smiley: General")
                    .addFields(
                        {
                            name: "avatar",
                            value: "Searches the Avatar of the you want!",
                        },
                        {
                            name: "invite",
                            value: "Finds the Invite link for the server",
                        },
                        {
                            name: "Math",
                            value:
                                "Do Maths with this one command! Use `!math-help` for Help in Maths",
                        },
                        {
                            name: "IP",
                            value:
                                "Find the IP or any place or any domain you want!",
                        },
                        {
                            name: "Fact",
                            value: "Get a Random fact with this command!",
                        }
                    )
                    .setColor("RANDOM");

                message.channel.send(embed);
            }

            if (helpArgs === "games") {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle(":video_game: Games")
                    .addFields({
                        name: "RPS",
                        value: "Play Rock Paper Scissor here!",
                    })
                    .setColor("RANDOM");

                message.channel.send(embed);
            }

            if (helpArgs === "moderation") {
                return message.channel.send("Coming Soon!");
            }

            if (helpArgs === "music") {
                return message.channel.send("These helps are coming soon");
            }

            if (helpArgs === "events") {
                return message.channel.send("These helps are coming soon");
            }

            if (helpArgs === "notify") {
                return message.channel.send(
                    "These features will be added soon"
                );
            }

            if (helpArgs === "nsfw") {
                return message.channel.send("Help NSFW");
            }

            if (helpArgs === "misc") {
                return message.channel.send("Help MISC");
            }

            if (helpArgs === "fun") {
                return message.channel.send("Help Fun");
            }

            if (helpArgs === "search") {
                return message.channel.send("Help Search");
            }

            if (!helpArgs) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL()
                    )
                    .setTitle(`Server Prefix: \`${PREFIX}\``)
                    .addField(
                        "To learn a command and its proper use, specify it's module in help command.",
                        "Example: ` !help games `"
                    )
                    .addField(
                        `${General.emoji} ${General.name}`,
                        `\`${General.number}\``,
                        true
                    )
                    .addField(
                        `${Games.emoji} ${Games.name}`,
                        `\`${Games.number}\``,
                        true
                    )
                    .addField(
                        `${Moderation.emoji} ${Moderation.name}`,
                        `\`${Moderation.number}\``,
                        true
                    )
                    .addField(
                        `${Music.emoji} ${Music.name}`,
                        `\`${Music.number}\``,
                        true
                    )
                    .addField(
                        `${Events.emoji} ${Events.name}`,
                        `\`${Events.number}\``,
                        true
                    )
                    .addField(
                        `${Notify.emoji} ${Notify.name}`,
                        `\`${Notify.number}\``,
                        true
                    )
                    .addField(
                        `${NSFW.emoji} ${NSFW.name}`,
                        `\`${NSFW.number}\``,
                        true
                    )
                    .addField(
                        `${MISC.emoji} ${MISC.name}`,
                        `\`${MISC.number}\``,
                        true
                    )
                    .addField(
                        `${Fun.emoji} ${Fun.name}`,
                        `\`${Fun.number}\``,
                        true
                    )
                    .addField(
                        `${Search.emoji} ${Search.name}`,
                        `\`${Search.number}\``,
                        true
                    )
                    .setColor("RANDOM")
                    .setFooter("Commands: 158");

                return message.channel.send(embed);
            }
        } catch (err) {
            console.error(err);
        }
    }
};
