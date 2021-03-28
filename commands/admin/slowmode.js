const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class SlowmodeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "slowmode",
            aliases: [],
            group: "moderation",
            memberName: "slowmode",
            description: "Initiates slowmode for a channel",
            details: oneLine`
                Initiates slowmode for a channel
            `,
            clientPermissions: ["MANAGE_CHANNELS"],
            examples: ["!slowmode <time>"],
            args: [
                {
                    key: "time",
                    type: "string",
                    prompt:
                        "Please specify how much time do you want to make your slowmode",
                },
                {
                    key: "reason",
                    type: "string",
                    prompt: "Please specify the reason",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { time, reason }) {
        try {
            if (!message.member.hasPermission("MANAGE_CHANNELS"))
                return message.channel.send(
                    "**You need `MANAGE_CHANNELS` permission to use this command**"
                );

            const { channel } = message;

            if (time < 2) {
                message.channel.send(
                    "Please provide a duration and a reason. For example: ` !slow 60 People are spamming `"
                );
                return;
            }

            let duration = time;
            if (duration === "off") {
                duration = 0;
            }

            if (isNaN(duration)) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL()
                    )
                    .setColor("RANDOM")
                    .setDescription(
                        'Please provide either a number of seconds or the word "off"'
                    )
                    .setThumbnail(
                        "https://i.pinimg.com/originals/3f/82/40/3f8240fa1d16d0de6d4e7510b43b37ba.gif"
                    )
                    .setFooter("CodeVert 2021");

                message.channel.send(embed);
                return;
            }

            channel.setRateLimitPerUser(duration, reason);

            let embed = new Discord.MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL()
                )
                .setColor("RANDOM")
                .setDescription(
                    `The slowmode for this channel "${message.channel.name}" was successfully set to ${duration} for ${reason}`
                )
                .setThumbnail(
                    "https://i.pinimg.com/originals/3f/82/40/3f8240fa1d16d0de6d4e7510b43b37ba.gif"
                )
                .setFooter("CodeVert 2021");

            message.reply(embed);
        } catch (err) {
            console.error(err);
        }
    }
};
