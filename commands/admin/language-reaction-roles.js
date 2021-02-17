const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class LanguageReactionRolesCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "rr-lang",
            aliases: [],
            group: "moderation",
            memberName: "rr-lang",
            description: "Get the Language Reaction Roles in one Command",
            details: oneLine`
                Get the Language Reaction Roles in one Command
            `,
            examples: ["!rr-lang"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        const channel = "810921429671477249";

        const HTML = "811466149782224958";
        const CSS = "811470391842963466";
        const Javascript = "811466518280798278";
        const NodeJS = "811465048882806824";
        const Python = "811468429184991272";
        const PHP = "811485994607968256";
        const Dart = "811524799792152586";
        const Swift = "811525276172419113";
        const Java = "811485676364759070";
        const CPP = "811471142325059614";
        const C = "811471447083319376";

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setColor("GREEN")
            .setTitle("Get your roles here!")
            .setDescription(
                "**React to this message to get your roles! Programmer Based Roles**\n\n" +
                    `<:HTML:811466149782224958>  if you know HTML\n\n` +
                    `<:CSS:811470391842963466>  if you know CSS\n\n` +
                    `<:JavaScript:811466518280798278>  if you know Javascript\n\n` +
                    `<:NodeJS:811465048882806824>  if you know NodeJS\n\n` +
                    `<:Python:811468429184991272>  if you know Python\n\n` +
                    `<:PHP:811485994607968256>  if you know PHP\n\n` +
                    `<:Dart:811524799792152586>  if you know Dart\n\n` +
                    `<:Swift:811525276172419113>  if you know Swift\n\n` +
                    `<:Java:811485676364759070>  if you know Java\n\n` +
                    `<:CPP:811471142325059614>  if you know C++\n\n` +
                    `<:CLang:811471447083319376>  if you know C\n`
            )
            .setFooter("Reaction Roles in CodeVert");

        let messageEmbed = await message.channel.send(embed);

        messageEmbed.react(HTML);
        messageEmbed.react(CSS);
        messageEmbed.react(Javascript);
        messageEmbed.react(NodeJS);
        messageEmbed.react(Python);
        messageEmbed.react(PHP);
        messageEmbed.react(Dart);
        messageEmbed.react(Swift);
        messageEmbed.react(Java);
        messageEmbed.react(CPP);
        messageEmbed.react(C);

        this.client.on("messageReactionAdd", async (reaction, user) => {
            try {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === HTML) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811503906274279434");
                    }

                    if (reaction.emoji.name === CSS) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811504196393500705");
                    }

                    if (reaction.emoji.name === Javascript) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509151497977858");
                    }

                    if (reaction.emoji.name === NodeJS) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509296176431137");
                    }

                    if (reaction.emoji.name === Python) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509238152560660");
                    }

                    if (reaction.emoji.name === PHP) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509213096181772");
                    }

                    if (reaction.emoji.name === Dart) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509454108622858");
                    }

                    if (reaction.emoji.name === Swift) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509454159347772");
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
