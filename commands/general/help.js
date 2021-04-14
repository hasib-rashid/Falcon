require("dotenv").config();

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const { oneLine } = require("common-tags");
const mongoose = require("mongoose");
const settingsSchema = require("../../models/settingsSchema.js");

mongoose.connect(process.env.MONGO_PATH, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

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
            let prefixDB = await settingsSchema.find({
                guild: message.guild.id,
            });

            console.log(prefixDB);

            let PREFIX = prefixDB[0].settings.prefix || ".";
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
                        **binary** - Turn a text into Binary
                        **cat** - Take a look in a cute cat!
                        **changelog** - The changelog of the current version of codevert
                        **covid** - Check the latest stats of covid 19
                        **decode** - Decode a binary number
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
                        **quiz** - Play a quiz game!
                        **minesweeper** - A Minesweeper game
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
                let embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle(":musical_note: Music")
                    .setDescription(
                        `
                            **play** - Play a song in the VC
                            **pause** - Pause a song
                            **resume** - Resume a video after pausing it
                            **stop** - Clears the queue and leaves the voice channel
                            **skip** - Skip a song
                            **search** - Search for a song in youtube
                            **repeat** - Repeat a song many times you want
                            **shuffle** - Shuffles the queue
                            **jump** - Jump to a certain song in the queue
                            **queue** - Shows the queue
                            **seek** - Moves the song to a certain part of the song
                            **volume** - Set the volume to a certain amount
                            **playSkip** - Skip the song and play another one
                            **addRelatedVideo** - Add a related Video
                            **setRepeatMode** - Set the Repeat Mode. For example \`setRepeatMode 0 | 1 | 2\`
                            **toggleAutoplay** - Toggle the Autoplay on or off
                            **code-radio** - Play the radio to code
                        `
                    )
                    .setColor("GREEN");

                message.channel.send(embed);
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
                if (!message.channel.nsfw)
                    return message.channel.send(
                        "**:underage: NSFW Commands. Please be in a NSFW Channel to use them.**"
                    );

                let embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle(":underage: NSFW")
                    .setDescription(
                        `
                            **anal** - NSFW Anal
                            **ass** - NSFW Ass
                            **boobs** - NSFW Boobs
                            **erokemo** - NSFW Erokemo
                            **fuck** - NSFW Fuck
                            **gonewild** - NSFW Gonewild
                            **hentai** - NSFW Hentai
                            **hentaiass** - NSFW HentaiAss
                            **hentaithigh** - NSFW HentaiThigh
                            **hmidriff** - NSFW Hmidriff
                            **kitsune** - NSFW kitsune
                            **lewd** - NSFW Lewd
                            **nekofeet** - NekoFeet
                            **nekopussy** - NSFW Nekopussy
                            **nekotits** - NSFW NekoTits
                            **porngif** - NSFW Porn Gif
                            **pussy** - NSFW Pussy
                            **solo** - NSFW Solo
                            **thigh** - NSFW thigh
                            **wallpaper** - NSFW Wallpaper
                        `
                    )
                    .setColor("GREEN");

                message.channel.send(embed);
            }

            if (helpArgs === "misc") {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle(":wrench: MISC")
                    .setDescription(
                        `
                            **stats** - Shows the stats of the bot
                            **info** - Information about the bot
                            **ping** - Shows the current ping of the bot
                            **uptime** - Shows the uptime of the bot
                        `
                    )
                    .setColor("GREEN");

                message.channel.send(embed);
            }

            if (helpArgs === "fun") {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle(":rofl: Fun")
                    .setColor("GREEN")
                    .setDescription(
                        "**8ball** -  8ball is here to answer your question!"
                    );

                message.channel.send(embed);
            }

            if (helpArgs === "search") {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL()
                    )
                    .setTitle(":mag_right: Search")
                    .setDescription(
                        `
                            **book** - Search any book
                            **country** - Get the info of a Country
                            **giphy** - Get a GIF from Giphy
                            **github** - Search GitHub and get info
                            **google** - Search the whole Google
                            **npm** - Search NPM
                            **urban** - Look for meaning in the Urban Dictionary
                            **weather** - Search the weather of a certain Location
                            **wikipedia** - Search Wikipedia
                            **youtube** - Search Youtube
                        `
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
                        `Example: \` ${PREFIX}help games \``
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
