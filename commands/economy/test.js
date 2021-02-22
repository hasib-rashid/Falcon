const Discord = require("discord.js");
const canvas = require("discord-canvas");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

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
        try {
            const channel = message.guild.channels.cache.find(
                (ch) => ch.name === "joins-and-leaves"
            );
            const welcome = new canvas.Welcome();
            const image = await welcome
                .setUsername(message.author.username)
                .setDiscriminator(message.author.discriminator)
                .setMemberCount(message.guild.memberCount)
                .setGuildName(message.guild.name)
                .setAvatar(
                    message.author.displayAvatarURL({
                        format: "png",
                        dynamic: false,
                        size: 4096,
                    })
                )
                .setColor("title", "#FFFFFF")
                .setColor("title-border", "#000")
                .setColor("avatar", "#000000")
                .setColor("border", "#000")
                .setColor("username-box", "#000")
                .setColor("username", "#FFFFFF")
                .setColor("hashtag", "#FFFFFF")
                .setColor("discriminator", "#FFFFFF")
                .setColor("discriminator-box", "#000")
                .setColor("message", "#FFFFFF")
                .setColor("message-box", "#000")
                .setColor("member-count", "#FFFFFF")
                .setColor("border", "#000000")
                .setBackground("https://wallpaperaccess.com//full/19811.jpg")
                .setText("title", "WELCOME")
                .setText("message", message.guild.name)
                .setText(
                    "member-count",
                    `-${message.guild.memberCount} Member!`
                )
                .toAttachment();
            let attachment = new Discord.MessageAttachment(
                image.toBuffer(),
                "welcome.png"
            );
            channel.send(attachment);
        } catch (err) {
            console.error(err);
        }
    }
};
