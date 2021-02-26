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
} = require("../../assets/JSON/help.json");

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
                            name: "Avatar",
                            value: "Searches the Avatar of the you want!",
                        },
                        {
                            name: "Invite",
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
                    .addFields(
                        {
                            name: "RPS",
                            value: "Play Rock Paper Scissor here!",
                        },
                        {
                            name: "Akinator",
                            value: "Play Akinator here! start the aki command!",
                        }
                    )
                    .setColor("GREEN");

                message.channel.send(embed);
            }

            if (helpArgs === "moderation") {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle("<:ban_hammer:809356434885967882> Moderation")
                    .addFields(
                        {
                            name: "ban",
                            value: "Ban Someone using this command",
                        },
                        {
                            name: "unban",
                            value: "Unan Someone using this command",
                        },
                        {
                            name: "kick",
                            value: "Kick Someone using this command",
                        },
                        {
                            name: "add-role",
                            value: "Unan Someone using this command",
                        },
                        {
                            name: "remove-role",
                            value: "Unban Someone using this command",
                        },
                        {
                            name: "purge",
                            value:
                                "Purge or delete some messages with this command",
                        },
                        {
                            name: "nuke",
                            value:
                                "Nuke the current channel which clears all the messages in the channel",
                        },
                        {
                            name: "giveaway",
                            value: "Do a giveaway with this command",
                        },
                        {
                            name: "slowmode",
                            value:
                                "Set the slowmode of the current channel with this command",
                        },
                        {
                            name: "ticket-setup",
                            value:
                                "Setup a channel for a ticket. Start with `!ticket-setup <channel_name>`",
                        },
                        {
                            name: "ticket-close",
                            value:
                                "Close a ticket with this command after work is done",
                        }
                    )
                    .setColor("GREEN");

                message.channel.send(embed);
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
                const embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle(":rofl: Fun")
                    .setColor("GREEN")
                    .addFields({
                        name: "8ball",
                        value: "8ball is here to answer your question!",
                    });

                message.channel.send(embed);
            }

            if (helpArgs === "search") {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle(":mag_right: Search")
                    .addFields(
                        {
                            name: "book",
                            value: "Searches Google Books for a book.",
                        },
                        {
                            name: "country",
                            value:
                                "Search about any country suing this command",
                        },
                        {
                            name: "giphy",
                            value: "Search a GIF with this command with Giphy!",
                        },
                        {
                            name: "github",
                            value: "Watch what is at github right now",
                        },
                        { name: "google", value: "Google something here!" },
                        {
                            name: "npm",
                            value: "Search for any npm package over here",
                        },
                        {
                            name: "urban",
                            value:
                                "Search any words from the dictionary easily",
                        },
                        {
                            name: "weather",
                            value:
                                "Search the Weather from anywhere and check the weather",
                        },
                        {
                            name: "wikipedia / wiki",
                            value: "Search Wikipedia with this command",
                        }
                    )
                    .setColor(0x4285f4);

                message.embed(embed);
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
                    .setColor("GREEN")
                    .setFooter(
                        `Commands: ${this.client.registry.commands.size}`
                    );

                return message.channel.send(embed);
            }
        } catch (err) {
            console.error(err);
        }
    }
};
