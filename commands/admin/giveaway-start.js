const Discord = require("discord.js");
const commando = require("discord.js-commando");
const ms = require("ms");
const oneLine = require("common-tags").oneLine;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "giveaway-start",
            aliases: [],
            group: "moderation",
            memberName: "giveaway-start",
            description: "Do a Giveaway with this command!",
            details: oneLine`
                Do a Giveaway with this command!
            `,
            examples: ["!giveaway-start 10d 1 Nitro"],
            args: [
                {
                    key: "time",
                    type: "string",
                    prompt: "What should be the time of the Giveaway",
                },
                {
                    key: "prize",
                    type: "string",
                    prompt: "What is the Prize of the Giveaway?",
                },
                {
                    key: "winners",
                    type: "string",
                    prompt: "How many winners will be there?",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message, { time, prize, winners }) {
        this.client.giveawaysManager
            .start(message.channel, {
                time: ms(time),
                prize: prize,
                winnerCount: parseInt(winners),
            })
            .then((gData) => {
                console.log(gData); // {...} (messageid, end date and more)
            });
    }
};
