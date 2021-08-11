import { MessageEmbed } from 'discord.js';
import Command from '../../typings/command';

const PurgeCommand: Command = {
    name: 'purge',
    description: 'Delete a certain amount of messages with just one command',
    aliases: [
        'clear'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(
                "**You need `MANAGE_MESSAGES` permission to use this command**"
            );

        if (message.member?.permissions.has("MANAGE_MESSAGES")) {
            const args = message.content.split(" ").slice(1);
            const amount = args.join(" ");

            if (!amount)
                return message.channel.send(
                    "**You haven't given an amount of messages which should be deleted!**"
                );

            // @ts-ignore
            if (isNaN(amount))
                return message.channel.send(
                    "**The amount parameter isn`t a number!**"
                );

            if (+amount > 100)
                return message.channel.send(
                    "**You can`t delete more than 100 messages at once!**"
                );
            if (+amount < 1)
                return message.channel.send(
                    "**You have to delete at least 1 message!**"
                );

            // @ts-ignore
            message.channel.bulkDelete(amount);

            const purgeEmbed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle("Purged Messages")
                .setDescription(
                    `**${amount} Messages has been deleted! by ${message.author.tag}**`
                )
                .setColor("#4287f5")
                .setFooter(client.user?.username, client.user?.displayAvatarURL())

            message.channel.send({ embeds: [purgeEmbed] }).then((msg) => {
                setTimeout(() => msg.delete(), 5000);
            });
        }
    },
}

export default PurgeCommand;