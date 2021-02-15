const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class AvatarCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "avatar",
            aliases: ["av", "profile-picture", "profile-pic", "pfp"],
            group: "general",
            memberName: "avatar",
            description: "Check your Avatar with this command!",
            details: oneLine`
                Check your Avatar with this command!
            `,
            examples: ["example"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        const member = message.mentions.members.first();
        if (!member) {
            const avatar_embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(
                    `**Avatar** \n [Download Image](${message.author.avatarURL()})`
                )
                .setTitle(`${message.author.username}'s Avatar`)
                .setImage(
                    message.author.avatarURL({ dynamic: true, size: 256 })
                );
            message.channel.send(avatar_embed);
        }

        if (member) {
            const other_avatar_embed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(
                    `**Avatar** \n [Download Image](${message.author.avatarURL()})`
                )
                .setTitle(`${member.user.tag}'s Avatar`)
                .setImage(member.user.avatarURL({ dynamic: true, size: 256 }));
            message.channel.send(other_avatar_embed);
        }
    }
};
