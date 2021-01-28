const { MessageEmbed } = require("discord.js");

module.exports = {
    id: "info",
    aliases: ["info", "information"],
    channels: "any",
    exec: (client) => {
        const hello_embed = new MessageEmbed()
            .setColor("RANDOM")
            .addField(
                "Hey there! I am the Official Moderating Bot of Hall Of Programmers! If you need any help then type: !help",
                ":thumbsup:"
            )
            .setTitle(`Hello! ${client.message.author.username}! :wave:`)
            .addField(
                `Hope you have a fantastic day ${client.message.author.username}!`,
                ":wink:"
            );

        client.message.channel.send(hello_embed);
    },
};
