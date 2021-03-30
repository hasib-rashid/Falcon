const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "gedit",
            aliases: ["giveaway-edit", "g-edit", "gw-edit", "gway-edit"],
            group: "moderation",
            memberName: "gedit",
            description: "Edit a Giveaway!",
            details: oneLine`
                Edit a Giveaway!
            `,
            examples: ["!gedit <messageID>"],
            args: [
                {
                    key: "messageID",
                    type: "string",
                    prompt: "What is the Message ID of the Giveaway?",
                },
                {
                    key: "prize",
                    type: "string",
                    prompt: "What is the prize of the new Giveaway?",
                },
                {
                    key: "newWinner",
                    type: "string",
                    prompt: "What is the number of winners?",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message, { messageID, prize, newWinner }) {
        try {
            if (!message.member.hasPermission("MANAGE_MESSAGES"))
                return message.channel.send(
                    "**You need `MANAGE_MESSAGES` permission to use this command**"
                );

            this.client.giveaways
                .edit(messageID, {
                    newWinnerCount: newWinner,
                    newPrize: prize,
                    addTime: 10000,
                })
                .then(() => {
                    const numberOfSecondsMax =
                        this.client.giveaways.options.updateCountdownEvery /
                        1000;
                    message.channel.send(
                        "Success! Giveaway will updated in less than " +
                            numberOfSecondsMax +
                            " seconds."
                    );
                })
                .catch((err) => {
                    message.channel.send(
                        "No giveaway found for " +
                            messageID +
                            ", please check and try again"
                    );
                });
        } catch (err) {
            console.error(err);
        }
    }
};
