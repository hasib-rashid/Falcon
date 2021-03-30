const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const ms = require("ms");

module.exports = class GiveawayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "giveaway",
            aliases: ["gway", "gw", "giveaway-start"],
            group: "moderation",
            memberName: "giveaway",
            description:
                "Giveaway anything in the right way using this command",
            details: oneLine`
                Giveaway anything in the right way using this command
            `,
            examples: ["!giveaway 10d Nitro $9.99"],
            args: [
                {
                    key: "prize",
                    type: "string",
                    prompt: "What should be the prize of the giveaway?",
                },
                {
                    key: "timing",
                    type: "string",
                    prompt: "What should be the time of the giveaway",
                },
                {
                    key: "winners",
                    type: "string",
                    prompt: "How many winners will be there",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { prize, timing, winners }) {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send(
                "**You need `MANAGE_MESSAGES` permission to use this command**"
            );

        const duration = timing;

        if (!isNaN(winners))
            return message.channel.send(
                "**Winner Number is not a valid Number**"
            );

        this.client.giveaways.start(message.channel, {
            time: ms(duration),
            prize: prize,
            winnerCount: winners,
            hostedBy: message.author,
            messages: {
                giveaway: ":tada:  **GIVEAWAY**  :tada:",
                giveawayEnd: ":tada: **GIVEAWAY ENDED** :tada:",
                timeRemaining: "Time Remaining **{duration}**",
                inviteToParticipate: "React with 🎉 to join the giveaway",
                winMessage:
                    ":tada: Congratulations {winners}! You have won the **{prize}**! :tada:",
                embedFooter: "",
                noWinner: "Could not determine a winner",
                hostedBy: "Hosted by {user}",
                winners: "winners",
                endedAt: "Ends at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false,
                },
            },
        });
    }
};
