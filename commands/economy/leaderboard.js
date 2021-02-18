const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const djs = require("djs-economy");

module.exports = class LeaderboardCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "leaderboard",
            aliases: [],
            group: "moderation",
            memberName: "leaderboard",
            description: "Check your Leaderboards in here",
            details: oneLine`
                Check your Leaderboards in here
            `,
            examples: ["!leaderboard"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        const output = await djs.Leaderboard({
            filter: (x) => x.cash > 50,
            search: message.author.id,
        });

        djs.Leaderboard({
            limit: 4, //You can change the limit to 10 if you want
            filter: (x) => x.cash > 50,
        }).then(async (users) => {
            if (users[0])
                var firstplace = await this.client.users.fetch(users[0].userid);
            if (users[1])
                var secondplace = await this.client.users.fetch(
                    users[1].userid
                );
            if (users[2])
                var thirdplace = await this.client.users.fetch(users[2].userid);
            if (users[3])
                var fourthplace = await this.client.users.fetch(
                    users[3].userid
                );

            let embed = new Discord.MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setTitle("Leaderboard")
                .setDescription(
                    `
                    🥇 ${(firstplace && firstplace.tag) || "Nobody Yet"} ⟶  ${
                        (users[0] && users[0].cash) || "None"
                    }\n🥈 ${
                        (secondplace && secondplace.tag) || "Nobody Yet"
                    } ⟶  ${(users[1] && users[1].cash) || "None"}\n🥉 ${
                        (thirdplace && thirdplace.tag) || "Nobody Yet"
                    } ⟶  ${(users[2] && users[2].cash) || "None"}\n🏅 ${
                        (fourthplace && fourthplace.tag) || "Nobody Yet"
                    } ⟶  ${(users[3] && users[3].cash) || "None"}`
                )
                .setFooter(
                    `${message.author.username} Your Ranking #${output}**`
                );

            message.channel.send(embed);
        });
    }
};
