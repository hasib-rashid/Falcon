import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'
import * as helpJSON from '../../assets/json/help.json'

const HelpCommand: Command = {
    name: 'help',
    description: 'Get all the help here',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const PREFIX = "."
        if (!args[0]) {
            const embed = new MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL()
                )
                .setTitle(`Server Prefix: \`${PREFIX}\``)
                .addField(`If you are using Falcon for the first time in this server then start with \`.help setup\``, "`=setup`")
                .addField(
                    "\n\n\nTo learn a command and its proper use, specify it's module in help command.\nLike: `!help [Command]`",
                    `Example: \` ${PREFIX}help games \``
                )
                .setColor("BLUE")
                .setFooter(
                    `Commands: 180`
                );

            for (var i = 0; i < 10; ++i) {
                const result = helpJSON[i];
                embed.addField(`${result.emoji} ${result.name}`, `\`${result.number}\``, true)
            }

            embed.addField("Extra Links", "[Invite Me](https://google.com) • [Discord](https://google.com) • [Website](https://google.com) • [Donate](https://google.com)")

            return message.channel.send(embed);
        }
    },
}

export default HelpCommand;