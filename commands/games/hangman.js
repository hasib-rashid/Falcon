const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const { hangman } = require("reconlx");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "hangman",
            aliases: [],
            group: "games",
            memberName: "hangman",
            description: "Play a game of Hangman",
            details: oneLine`
                Play a game of Hangman
            `,
            examples: ["!hangman"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            message.author.lastMessage.delete();

            const args = message.content.split(" ").slice(1);

            const hang = new hangman({
                message: message,
                word: args[0],
                client: this.client,
                channelID:
                    message.mentions.channels.first() || message.channel.id,
            });

            hang.start();
        } catch (err) {
            message.channel.send(
                "**An Error Occured. use the Correct format. `hangman <word> <channelID>`**"
            );
        }
    }
};
