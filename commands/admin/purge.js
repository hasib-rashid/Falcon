const Discord = require("discord.js");

module.exports = {
    name: "purge",
    description: "Purges a certain amount of Messages",
    usage: "!purges <number_of_messages>",
    aliases: [],
    permissions: ["MANAGE_CHANNELS"],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.channel.send(
            ":no_entry: Insufficient Permissions! Only Moderators' can use this command!"
        );
    }

    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        const args = message.content.split(" ").slice(1);
        const amount = args.join(" ");

        if (!amount)
            return message.channel.send(
                "You haven't given an amount of messages which should be deleted!"
            );
        if (isNaN(amount))
            return message.channel.send("The amount parameter isn`t a number!");

        if (amount > 100)
            return message.channel.send(
                "You can`t delete more than 100 messages at once!"
            );
        if (amount < 1)
            return message.channel.send(
                "You have to delete at least 1 message!"
            );

        message.channel.messages.cache.get({ limit: amount });
        message.channel.bulkDelete(amount);

        const purgeEmbed = new Discord.MessageEmbed()
            .setTitle("Operation Succesful")
            .setAuthor(`By ${message.author.tag}`)
            .setDescription(
                `${amount} Messages has been deleted! by ${message.author.tag}`
            )
            .setColor("RANDOM")
            .setThumbnail(message.author.avatarURL);

        message.channel.send(purgeEmbed).then((msg) => {
            setTimeout(() => msg.delete(), 5000);
        });
    }
};
