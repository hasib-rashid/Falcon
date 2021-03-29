const Discord = require("discord.js");
const commando = require("discord.js-commando");
const { oneLine } = require("common-tags");

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
                    .setDescription(
                        `
                        **avatar** - Check someones avatar
                        **cat** - Take a look in a cute cat!
                        **changelog** - The changelog of the current version of codevert
                        **covid** - Check the latest stats of covid 19
                        **facts** - Get a random fact!
                        **help** - Get help to see what commands are in here
                        **invite** - Get the invite link of this server
                        **ip** - Check the Ip of a website or a network
                        **math** - Do maths with this command
                        **puppy** - Get a pic of a cute Puppy!
                        **serverInfo** - Get the full info of this server
                        **translator** - Translate anything you want
                        **userInfo** - Get the Inforamtion on a user
                        **whois** - See who is the person with this command
                    `
                    )
                    .setColor("GREEN");

                message.channel.send(embed);
            }

            if (helpArgs === "games") {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle(":video_game: Games")
                    .setDescription(
                        `
                        **aki** - Play Akinator
                        **gunfight** - Do a gunfight!
                        **hangman** - Guess the correct words in hangman
                        **rps** - Rock Paper Scissors Shoo
                        **russianroulette** - A game of Russian roulette
                        **snakegame** - Play a OG game of Snake
                        **tictactoe** - Play Tic Tac Toe with your freinds
                    `
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
                    .setDescription(
                        `
                            **ban** - Ban a user
                            **kick** - Kick a user
                            **addRole** - add Role to a user
                            **removeRole** - Remove Role of a user
                            **createRR** - create a reaction role
                            **deleteRR** - delete a reaction role
                            **fetchTranscript** - Fetch the transcript of the channel
                            **giveaway** - Do a Giveaway
                            **greroll** - Reroll a giveaway
                            **gedit** - Edit a Giveaway
                            **lockdown** - Lock down a server during raid
                            **Unlockdown** - Unlock down the server when a raid stops
                            **slowmode** - Set the slowmode of a channel
                            **nuke** - Nuke the channel
                            **purge** - Purge a certain amount of messages in a channel
                            **ticket-setup** - Setup a ticket system
                            **ticket-close** - Close the ticket of a member
                        `
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
                return message.channel.send("These helps are coming soon");
            }

            if (helpArgs === "misc") {
                return message.channel.send("These helps are coming soon");
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
