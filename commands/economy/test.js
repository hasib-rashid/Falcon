const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const Canvas = require("discord-canvas");

module.exports = class SomethingCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "test",
            aliases: [],
            group: "general",
            memberName: "test",
            description: "description",
            details: oneLine`
                description
            `,
            examples: ["example"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        const image = await new Canvas.Welcome()
            .setUsername(message.author.username)
            .setDiscriminator(message.author.discriminator)
            .setMemberCount("140")
            .setGuildName(message.guild.name)
            .setAvatar(message.author.avatarURL({ format: "png" }))
            .setBackground(
                "https://images.unsplash.com/photo-1507149677524-254e3ebb240f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80"
            )
            .toAttachment();

        const attachment = new Discord.MessageAttachment(
            image.toBuffer(),
            "goodbye-image.png"
        );

        message.channel.send(attachment);
    }
};
