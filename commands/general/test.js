require("dotenv").config();

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const testSchema = require("../../models/testSchema.js");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_PATH, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "test",
            aliases: [],
            group: "general",
            memberName: "test",
            description: "Testing Shit",
            details: oneLine`
                Testing Shit
            `,
            examples: ["!test"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const test = new testSchema({
            userID: message.author.id,
            GuildID: message.guild.id,
            coins: "500",
        });

        test.save();

        message.channel.send("Success");
    }
};
