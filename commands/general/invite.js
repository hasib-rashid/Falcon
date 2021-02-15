const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "invite",
            aliases: [],
            group: "general",
            memberName: "invite",
            description: "Invite someone with this link",
            details: oneLine`
                Invite someone with this link
            `,
            examples: ["!invite"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        let embed = new Discord.MessageEmbed()
            .setAuthor(
                message.author.username,
                message.author.displayAvatarURL()
            )
            .setColor("RANDOM")
            .setTitle("Invite CodeVert!")
            .addField(
                "**Invite CodeVert with this link**",
                "[Invite Me](https://discord.com/api/oauth2/authorize?client_id=799543154692718602&permissions=8&scope=bot)"
            );

        message.channel.createInvite({ unique: true }).then((invite) => {
            message.channel.send(
                "**This Server's Invite Link** https://discord.gg/" +
                    invite.code
            );
        });
        message.channel.send(embed);
    }
};
