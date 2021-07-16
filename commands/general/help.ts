import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'
import { helpAsserts } from '../../assets/json/helpAssersts'

const HelpCommand: Command = {
    name: 'help',
    description: 'Get all the help here',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const PREFIX = "." // Dynamic PRefix incoming

        try {
            if (args[0] === "general") {
                const embed = new MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL()
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
                    .setColor("#0887ff");

                message.channel.send(embed);
            }

            if (args[0] === "games") {
                const embed = new MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL()
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
                    .setColor("#0887ff");

                message.channel.send(embed);
            }

            if (args[0] === "moderation") {
                const embed = new MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL()
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
                    .setColor("#0887ff");

                message.channel.send(embed);
            }

            if (args[0] === "music") {
                const embed = new MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL()
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
                    .setColor("#0887ff");

                message.channel.send(embed);
            }

            if (args[0] === "events") {
                return message.channel.send("These helps are coming soon");
            }

            if (args[0] === "notify") {
                return message.channel.send(
                    "These features will be added soon"
                );
            }

            if (args[0] === "nsfw" || args[0] === "NSFW") {
                // @ts-expect-error
                if (!message.channel.nsfw)
                    return message.channel.send(
                        "**:underage: NSFW Commands. Please be in a NSFW Channel to use them.**"
                    );

                const embed = new MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL()
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
                    .setColor("#0887ff");

                message.channel.send(embed);
            }

            if (!args[0]) {
                const embed = new MessageEmbed()
                    .setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL()
                    )
                    .setTitle(`Server Prefix: \`${PREFIX}\``)
                    .addField(`If you are using Falcon for the first time in this server then start with \`.help setup\``, "`=setup`")
                    .addField(
                        "\n\n\nTo learn a command and its proper use, specify it's module in help command.\nLike: `!help [Command]`",
                        `Example: \` ${PREFIX}help games \``
                    )
                    .setColor("#0887ff")
                    .setFooter(
                        `Commands: 180`
                    );

                for (var i = 0; i < 10; ++i) {
                    const result = helpAsserts[i];
                    embed.addField(`${result.emoji} ${result.name}`, `\`${result.number}\``, true)
                }

                embed.addField("Extra Links", "[Invite Me](https://google.com) • [Discord](https://google.com) • [Website](https://google.com) • [Donate](https://google.com)")

                return message.channel.send(embed);
            }
        } catch (err) {
            return message.channel.send("**There has been a error. Please try again.**");
        }
    },
}

export default HelpCommand;