const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "user-info",
            aliases: ["userinfo"],
            group: "general",
            memberName: "user-info",
            description: "Gives the Information about a specific user.",
            details: oneLine`
                Gives the Information about a specific user.
            `,
            examples: ["!user-info <@user>"],
            args: [
                {
                    key: "user",
                    type: "user",
                    prompt:
                        "Please specify the user you want to add the role to",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            const userMention =
                message.mentions.users.first() || message.author;
            const memberMention =
                message.mentions.members.first() || message.member;

            let userinfo = {};
            userinfo.bot = userMention.bot;
            userinfo.createdat = userMention.createdAt;
            userinfo.discrim = userMention.discriminator;
            userinfo.id = userMention.id;
            userinfo.mfa = userMention.mfaEnabled;
            userinfo.pre = userMention.premium;
            userinfo.presen = userMention.presence;
            userinfo.tag = userMention.tag;
            userinfo.uname = userMention.username;
            userinfo.verified = userMention.verified;

            userinfo.avatar = userMention.avatarURL();

            const rolesOfTheMember = memberMention.roles.cache
                .filter((r) => r.name !== "@everyone")
                .map((role) => role.name)
                .join("\n");

            const myInfo = new Discord.MessageEmbed()
                .setAuthor(
                    memberMention.user.username,
                    memberMention.user.displayAvatarURL()
                )
                .addField(
                    "Roles in this server",
                    "```" + rolesOfTheMember + "```"
                )
                .addField("Bot?", "```" + userinfo.bot + "```", true)
                .addField(
                    "Created At",
                    "```" + userinfo.createdat + "```",
                    true
                )
                .addField(
                    "Discriminator",
                    "```" + userinfo.discrim + "```",
                    true
                )
                .addField("Client ID", "```" + userinfo.id + "```", true)
                .addField(
                    "2FA/MFA Enabled?",
                    "```" + userinfo.mfa + "```",
                    true
                )
                .addField("Paid Account?", "```" + userinfo.pre + "```", true)
                .addField(
                    "Presence",
                    "```" +
                        userinfo.presen.clientStatus.desktop.toUpperCase() +
                        "```",
                    true
                )
                .addField("Client Tag", "```" + userinfo.tag + "```", true)
                .addField("Username", "```" + userinfo.uname + "```", true)
                .addField("Verified?", "```" + userinfo.verified + "```", true)
                .setColor("#128bfc")
                .setFooter(
                    message.client.user.username,
                    message.client.user.displayAvatarURL()
                )
                .setTitle("About this user...");

            message.channel.send(myInfo);
        } catch (err) {
            console.error(err);
        }
    }
};
