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

        //* Developer Roles
        const WebDeveloper = "🖥️";
        const MobileDeveloper = "📱";
        const AIDeveloper = "🤖";
        const BotDeveloper = "✨";
        const PythonDeveloper = "🐍";
        const LibraryDeveloper = "📦";
        const APIDeveloper = "📰";
        const GameDeveloper = "🎮";

        //* Language Roles
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

        let DeveloperEmbed = new Discord.MessageEmbed()
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

        let LanguageEmbed = new Discord.MessageEmbed()
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

        let messageEmbed = await message.channel.send(DeveloperEmbed);
        let LanguageMessageEmbed = await message.channel.send(LanguageEmbed);

        // Reaction to Developer Roles
        messageEmbed.react(WebDeveloper);
        messageEmbed.react(MobileDeveloper);
        messageEmbed.react(PythonDeveloper);
        messageEmbed.react(AIDeveloper);
        messageEmbed.react(APIDeveloper);
        messageEmbed.react(LibraryDeveloper);
        messageEmbed.react(BotDeveloper);
        messageEmbed.react(AIDeveloper);
        messageEmbed.react(GameDeveloper);

        // Reaction to Lanuage Roles
        LanguageMessageEmbed.react(HTML);
        LanguageMessageEmbed.react(CSS);
        LanguageMessageEmbed.react(Javascript);
        LanguageMessageEmbed.react(NodeJS);
        LanguageMessageEmbed.react(Python);
        LanguageMessageEmbed.react(PHP);
        LanguageMessageEmbed.react(Dart);
        LanguageMessageEmbed.react(Swift);
        LanguageMessageEmbed.react(Java);
        LanguageMessageEmbed.react(CPP);
        LanguageMessageEmbed.react(C);

        this.client.on("messageReactionAdd", async (reaction, user) => {
            try {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id == channel) {
                    //* Developer Roles
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

                    //* Language Roles

                    if (reaction.emoji.id === HTML) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811503906274279434");
                    }

                    if (reaction.emoji.id === CSS) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811504196393500705");
                    }

                    if (reaction.emoji.id === Javascript) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509151497977858");
                    }

                    if (reaction.emoji.id === NodeJS) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509296176431137");
                    }

                    if (reaction.emoji.id === Python) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509238152560660");
                    }

                    if (reaction.emoji.id === PHP) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509213096181772");
                    }

                    if (reaction.emoji.id === Dart) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509454108622858");
                    }

                    if (reaction.emoji.id === Swift) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509454159347772");
                    }

                    if (reaction.emoji.id === Java) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811509271459659796");
                    }

                    if (reaction.emoji.id === CPP) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811634758034391041");
                    }

                    if (reaction.emoji.id === C) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.add("811634839421059103");
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

                    //* Language Roles

                    if (reaction.emoji.id === HTML) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811503906274279434");
                    }

                    if (reaction.emoji.id === CSS) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811504196393500705");
                    }

                    if (reaction.emoji.id === Javascript) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811509151497977858");
                    }

                    if (reaction.emoji.id === NodeJS) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811509296176431137");
                    }

                    if (reaction.emoji.id === Python) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811509238152560660");
                    }

                    if (reaction.emoji.id === PHP) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811509213096181772");
                    }

                    if (reaction.emoji.id === Dart) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811509454108622858");
                    }

                    if (reaction.emoji.id === Swift) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811509454159347772");
                    }

                    if (reaction.emoji.id === Java) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811509271459659796");
                    }

                    if (reaction.emoji.id === CPP) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811634758034391041");
                    }

                    if (reaction.emoji.id === C) {
                        await reaction.message.guild.members.cache
                            .get(user.id)
                            .roles.remove("811634839421059103");
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
