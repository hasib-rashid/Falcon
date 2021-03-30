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
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const args = message.content.slice(5).trim().split("  ");

        try {
            let user =
                message.mentions.members.first() ||
                message.guild.members.cache.get(args[0]) ||
                message.member;

            let status;
            switch (user.presence.status) {
                case "online":
                    status = "online";
                    break;
                case "dnd":
                    status = "dnd";
                    break;
                case "idle":
                    status = "idle";
                    break;
                case "offline":
                    status = "offline";
                    break;
            }

            const embed = new Discord.MessageEmbed()
                .setTitle(`${user.user.username} stats`)
                .setColor("#179aff")
                .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    {
                        name: "Name: ",
                        value: user.user.username,
                        inline: true,
                    },
                    {
                        name: "Discriminator : ",
                        value: `#${user.user.discriminator}`,
                        inline: true,
                    },
                    {
                        name: "ID : ",
                        value: user.user.id,
                    },
                    {
                        name: "Current Status : ",
                        value: status,
                        inline: true,
                    },
                    {
                        name: "Activity : ",
                        value: user.presence.activities[0]
                            ? user.presence.activities[0].name
                            : `User isn't playing a game!`,
                        inline: true,
                    },
                    {
                        name: "Avatar link : ",
                        value: `[Click Here](${user.user.displayAvatarURL()})`,
                    },
                    {
                        name: "Creation Date : ",
                        value: user.user.createdAt.toLocaleDateString("en-us"),
                        inline: true,
                    },
                    {
                        name: "Joined Date : ",
                        value: user.joinedAt.toLocaleDateString("en-us"),
                        inline: true,
                    },
                    {
                        name: "User Roles : ",
                        value: user.roles.cache
                            .map((role) => role.toString())
                            .join(" ,"),
                        inline: true,
                    }
                );

            await message.channel.send(embed);
        } catch (err) {
            console.error(err);
        }
    }
};
