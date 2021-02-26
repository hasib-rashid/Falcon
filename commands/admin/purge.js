const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

module.exports = class PurgeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "purge",
            aliases: [],
            group: "moderation",
            memberName: "purge",
            clientPermissions: ["MANAGE_CHANNELS"],
            description:
                "Purge or delete the unintentional messages with just 1 command!",
            details: oneLine`
                Purge or delete the unintentional messages with just 1 command!
            `,
            examples: ["!purge <number_of_commands>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
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
                return message.channel.send(
                    "The amount parameter isn`t a number!"
                );

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
                .setColor("GREEN")
                .setThumbnail(message.author.avatarURL);

            message.channel.send(purgeEmbed).then((msg) => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    }
};
