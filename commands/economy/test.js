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
        const image = await new Canvas.RankCard()
            .setAvatar("xixi52")
            .setXP("current", 500)
            .setXP("needed", 1000)
            .setLevel(7)
            .setRank(2)
            .setReputation(450)
            .setRankName("professional")
            .setUsername("xixi52")
            .setBadge(1, "gold")
            .setBadge(3, "diamond")
            .setBadge(5, "silver")
            .setBadge(6, "bronze")
            .setBackground("https://www.site.com/background.jpg")
            .toAttachment();

        const attachment = new Discord.MessageAttachment(
            image.toBuffer(),
            "rank-card.png"
        );

        message.channel.send(attachment);
    }
};
