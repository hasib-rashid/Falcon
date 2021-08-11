import { MessageEmbed } from 'discord.js';
import Command from '../../typings/command';

const SearchCommand: Command = {
    name: 'search',
    description: 'Search a song!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!args)
            return message.channel.send(
                "**Please sepcify which song do I search**"
            );

        message.channel.send(
            "<:youtube:864559346137956402> **Searching** :mag_right: `" +
            `${args.join(" ")}` +
            "`"
        );

        const result = await client.distube.search(args.join(" "));

        let searchresult = "";

        for (let i = 0; i <= result.length; i++) {
            try {
                searchresult += await `**${i + 1}**. ${result[i].name
                    } - \`${result[i].formattedDuration}\`\n`;
            } catch {
                searchresult += await " ";
            }
        }

        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle("Search Results")
            .setColor("BLUE")
            .setDescription(searchresult)

        const searchEmbed = await message.channel.send(embed)

        let userinput: any;

        await message.channel
            .awaitMessages((m) => m.author.id == message.author.id, {
                max: 1,
                time: 60000,
                errors: ["time"],
            })
            .then((collected) => {
                userinput = collected.first()?.content;
                if (isNaN(userinput)) {
                    const embed = new MessageEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL())
                        .setColor("RED")
                        .setDescription("**Not a right number. So I use number 1!")

                    message.channel.send(embed)

                    userinput = 1;
                }
                if (Number(userinput) < 0 && Number(userinput) >= 15) {
                    const embed = new MessageEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL())
                        .setColor("RED")
                        .setDescription("**Not a right number. So I use number 1!")

                    message.channel.send(embed)

                    userinput = 1;
                }
                searchEmbed.delete({
                    timeout: Number(client.ws.ping),
                });
            })
            .catch(() => {
                userinput = 404;
            });
        if (userinput === 404) {
            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle("404 Error")
                .setColor("RED")
                .setDescription("**Something Went Wrong**")

            message.channel.send(embed)
        }

        return client.distube.play(message, result[userinput - 1].url);
    },
}

export default SearchCommand;