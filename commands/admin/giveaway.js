const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class GiveawayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "giveaway",
            aliases: ["gway", "gw"],
            group: "moderation",
            memberName: "giveaway",
            description:
                "Giveaway anything in the right way using this command",
            details: oneLine`
                Giveaway anything in the right way using this command
            `,
            examples: ["!giveaway 10d Nitro $9.99"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, client) {
        const args = message.content.slice().split(" ");

        if (!message.guild) return;
        var time = "";
        var time2 = "";
        var time3 = "";
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.channel.send(
                "You don't have enough permissions to use this command."
            );
        if (!args) {
            return message.channel.send(
                `You didn\'t state a duration or a price for the giveaway.`
            );
        }

        const stated_duration_hours = message.content.split(" ")[1];
        const stated_duration_hours2 =
            stated_duration_hours.toLowerCase() || stated_duration_hours;
        if (stated_duration_hours2.includes("s")) {
            var time = "s";
        }
        if (stated_duration_hours2.includes("m")) {
            var time = "m";
        }
        if (stated_duration_hours2.includes("h")) {
            var time = "h";
        }
        if (stated_duration_hours2.includes("d")) {
            var time = "d";
        }
        const stated_duration_hours3 = stated_duration_hours2.replace(time, "");
        if (stated_duration_hours3 === "0") {
            message.channel.send("The duration has to be atleast one.");
        }
        if (isNaN(stated_duration_hours3)) {
            message.channel.send(
                "The duration has to be a valid time variable."
            );
        }
        if (stated_duration_hours3 > 1) {
            var time3 = "s";
        }
        if (time === "s") {
            var actual_duration_hours = stated_duration_hours3 * 1000;
            var time2 = "second";
        }
        if (time === "m") {
            var actual_duration_hours = stated_duration_hours3 * 60000;
            var time2 = "minute";
        }
        if (time === "h") {
            var actual_duration_hours = stated_duration_hours3 * 3600000;
            var time2 = "hour";
        }
        if (time === "d") {
            var actual_duration_hours = stated_duration_hours3 * 86400000;
            var time2 = "day";
        }
        if (!isNaN(stated_duration_hours3)) {
            const prize = message.content.split(" ").slice(2).join(" ");
            if (prize === "")
                return message.channel.send("You have to enter a price.");
            if (stated_duration_hours3 !== "0") {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${prize}`)
                    .setColor("RANDOM")
                    .setDescription(
                        `React with 🎉 to enter!\nTime duration: **${stated_duration_hours3}** ${time2}${time3}\nHosted by: ${message.author}`
                    )
                    .setTimestamp(Date.now() + actual_duration_hours)
                    .setFooter("Ends at");
                let msg = await message.channel.send(
                    ":tada: **GIVEAWAY** :tada:",
                    embed
                );
                await msg.react("🎉");
                setTimeout(() => {
                    msg.reactions.cache
                        .get("🎉")
                        .users.remove(this.client.user.id);
                    setTimeout(() => {
                        let winner = msg.reactions.cache
                            .get("🎉")
                            .users.cache.random();
                        if (
                            msg.reactions.cache.get("🎉").users.cache.size < 1
                        ) {
                            const winner_embed = new Discord.MessageEmbed()
                                .setTitle(`${prize}`)
                                .setColor("36393F")
                                .setDescription(
                                    `Winner:\nNo one entered the giveaway.\nHosted by: ${message.author}`
                                )
                                .setTimestamp()
                                .setFooter("Ended at");
                            msg.edit(
                                ":tada: **GIVEAWAY ENDED** :tada:",
                                winner_embed
                            );
                        }
                        if (
                            !msg.reactions.cache.get("🎉").users.cache.size < 1
                        ) {
                            const winner_embed = new Discord.MessageEmbed()
                                .setTitle(`${prize}`)
                                .setColor("36393F")
                                .setDescription(
                                    `Winner:\n${winner}\nHosted by: ${message.author}`
                                )
                                .setTimestamp()
                                .setFooter("Ended at");
                            msg.edit(
                                ":tada: **GIVEAWAY ENDED** :tada:",
                                winner_embed
                            );
                        }
                    }, 1000);
                }, actual_duration_hours);
            }
        }
    }
};
