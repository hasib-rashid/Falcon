const math = require("discord-math");

const Discord = require("discord.js");

module.exports = {
    name: "math",
    description: "Do Maths with Discord.js",
    usage: "!math <first_number> <operator> <second_number>",
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    try {
        let num1 = Number(args[0]);
        let operation = args[1];
        let num2 = Number(args[2]);

        if (!num1)
            return message.channel.send(
                "The First Number needs to be specified!"
            );
        if (!operation)
            return message.channel.send("An operation was not specified!");
        if (!num2)
            return message.channel.send(
                "The Second Number needs to be specified!"
            );

        message.channel.send(
            `Answer: ${math.calculate(num1, operation, num2)}`
        );
    } catch (e) {
        console.log(e);
    }
};
