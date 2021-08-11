import { MessageEmbed } from 'discord.js';
import Command from '../../typings/command';

const SlowmodeCommand: Command = {
    name: 'slowmode',
    description: 'Set the slowmode of the channel',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            let time = args[0]
            const reason = args.slice(1).join(' ') || "No Reason";

            if (!message.member?.permissions.has("MANAGE_CHANNELS"))
                return message.channel.send(
                    "**You need `MANAGE_CHANNELS` permission to use this command**"
                );

            const { channel } = message;

            let duration = time;
            if (duration === "off") {
                // @ts-ignore
                duration = 0;
            }

            if (isNaN(+duration)) {
                let embed = new MessageEmbed()
                    .setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL()
                    )
                    .setColor("#387df5")
                    .setDescription(
                        '**Please provide either a number of seconds or the word "off"**'
                    )
                    .setThumbnail(
                        "https://i.pinimg.com/originals/3f/82/40/3f8240fa1d16d0de6d4e7510b43b37ba.gif"
                    )
                    .setFooter(client.user?.username, client.user?.displayAvatarURL());

                message.channel.send({ embeds: [embed] });
                return;
            }

            // @ts-ignore
            channel.setRateLimitPerUser(duration, reason);

            const embed = new MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL()
                )
                .setColor("#387df5")
                .setDescription(
                    // @ts-ignore
                    `**The slowmode for ${message.channel} was successfully set to ${duration} seconds for \`${reason}\`**`
                )
                .setThumbnail(
                    "https://i.pinimg.com/originals/3f/82/40/3f8240fa1d16d0de6d4e7510b43b37ba.gif"
                )
                .setFooter(client.user?.username, client.user?.displayAvatarURL());

            message.reply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
        }
    },
}

export default SlowmodeCommand;