import { config } from 'dotenv';
config()

import { RunFunction } from '../../interfaces/Command';
import { GeneralCommands, AdminCommands, EventsCommands, FunCommands, GamesCommands, MISCCommands, MusicCommands, NSFWCommnads, NotifyCommands, OwnerCommands, SearchCommands, numberOfCommands, totalCommands } from '../../client/Client'
import { MessageEmbed } from 'discord.js';
import { UtilsManager } from '../../utils/Utils'
import { helpAsserts } from '../../assets/help';
const { getArraySum } = UtilsManager.prototype

import { Deta } from 'deta'
const deta = Deta(process.env.DEFAULT_DB)
const guildModel = deta.Base("guild")

export const name = 'help'
export const category = 'general'
export const description = 'Helping'

export const run: RunFunction = async (client, message, args) => {

    const guildCache = await guildModel.fetch({ guildID: message.guild.id })

    let PREFIX: any;

    try {
        PREFIX = guildCache.items[0].prefix
    } catch (err) {
        PREFIX = client.prefix
    }

    try {
        if (args[0] === "general") {
            const embed = new MessageEmbed()
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setTitle(":smiley: General")
                .setDescription(GeneralCommands)
                .setColor("#0887ff");

            message.channel.send(embed);
        }

        if (args[0] === "fun") {
            const embed = new MessageEmbed()
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setTitle(":smiley: General")
                .setDescription(FunCommands)
                .setColor("#0887ff");

            message.channel.send(embed);
        }

        if (args[0] === "misc") {
            const embed = new MessageEmbed()
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setTitle(":wrench: MISC")
                .setDescription(MISCCommands)
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
                .setDescription(GamesCommands)
                .setColor("#0887ff");

            message.channel.send(embed);
        }

        if (args[0] === "search") {
            const embed = new MessageEmbed()
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setTitle(":smiley: General")
                .setDescription(SearchCommands)
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
                .setDescription(AdminCommands)
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
                .setDescription(MusicCommands)
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
                .setDescription(NSFWCommnads)
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
                .addField(`If you are using Falcon for the first time in this server then start with \`${PREFIX}help setup\``, `\`${PREFIX}setup\``)
                .addField(
                    `\n\n\nTo learn a command and its proper use, specify it's module in help command.\nLike: \`${PREFIX}help [Command]\``,
                    `Example: \` ${PREFIX}help games \``
                )
                .setColor("#0887ff")
                .setFooter(
                    `Number of Commands: ${getArraySum(numberOfCommands)}`
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
}