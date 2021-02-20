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
    }
};
