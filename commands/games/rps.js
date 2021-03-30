const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const { promptMessage } = require("../../util/functions.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "rps",
            aliases: [],
            group: "games",
            memberName: "rps",
            description: "Play Rock Paper Scissors with the bot",
            details: oneLine`
                Play Rock Paper Scissors with the bot
            `,
            examples: ["!rps"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            const embed = new Discord.MessageEmbed()
                .setColor("#037ffc")
                .setAuthor(
                    message.member.displayName,
                    message.author.displayAvatarURL()
                )
                .setTitle("**Rock Paper Scissors**")
                .setDescription(
                    "Play a game of **Rock | Paper | Scissors** against the bot!"
                )
                .setFooter(
                    message.guild.me.displayName,
                    this.client.user.displayAvatarURL()
                );

            const m = await message.channel.send(embed);
            const reacted = await promptMessage(
                m,
                message.author,
                30,
                chooseArr
            );

            const botChoice =
                chooseArr[Math.floor(Math.random() * chooseArr.length)];

            const result = await getResult(reacted, botChoice);
            await m.reactions.removeAll();

            embed
                .setTitle(result)
                .addField(
                    `**Your Choice:     ${reacted}\n\nMy Choice:        ${botChoice}**\n\nGG`
                );

            if (result === "You won!") {
                embed.setColor("GREEN");
            }

            if (result === "You lost!") {
                embed.setColor("#fc0335");
            }

            if (result === "Its a tie!") {
                embed.setColor("#037ffc");
            }
            m.edit(embed);
        } catch (err) {
            console.log(err);
            return message.channel.send("**An Unexpected Error Occured**");
        }
        function getResult(me, botChosen) {
            if (
                (me === "🗻" && botChosen === "✂") ||
                (me === "📰" && botChosen === "🗻") ||
                (me === "✂" && botChosen === "📰")
            ) {
                return "You won!";
            } else if (me === botChosen) {
                return "Its a tie!";
            } else {
                return "You lost!";
            }
        }
    }
};
