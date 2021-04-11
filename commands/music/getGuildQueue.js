const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "queue",
            aliases: [],
            group: "music",
            memberName: "queue",
            description: "Get the queue of the current guild",
            details: oneLine`
                Get the queue of the current guild
            `,
            examples: ["!queue"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            let queue = this.client.distube.getQueue(message);

            let embed = new Discord.MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setTitle("Current Queue")
                .setFooter(
                    this.client.user.username,
                    this.client.user.displayAvatarURL()
                )
                .setColor("#4287f5");

            embed.setDescription(
                queue.songs
                    .map(
                        (song, id) =>
                            `**${id + 1}**. [${song.name}](${song.url}) - \`${
                                song.formattedDuration
                            }\``
                    )
                    .join("\n")
            );

            message.channel.send(embed);
        } catch (err) {
            console.error(err);
            message.channel.send(
                "**An Unexpected Error Occured. There might be no songs playing.**"
            );
        }
    }
};
