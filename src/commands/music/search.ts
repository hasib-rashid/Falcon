import { Message } from 'discord.js';
import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'search'
export const category = 'music'
export const description = 'Search a song in Youtube'

export const run: RunFunction = async (client, message, args) => {
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

    const searchEmbed = await message.channel.send({ embeds: [embed] })

    let userinput: any;

    await message.channel
    await message.channel.awaitMessages({ filter: (m: Message) => m.author.id === message.author.id, max: 1, time: 30000 }).then(collected => {
        if (collected.first().author.id !== message.author.id) return;
        userinput = collected.first()?.content;
        if (isNaN(userinput)) {
            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setColor("RED")
                .setDescription("**Not a right number. So I use number 1!")

            message.channel.send({ embeds: [embed] })

            userinput = 1;
        }
        if (Number(userinput) < 0 && Number(userinput) >= 15) {
            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setColor("RED")
                .setDescription("**Not a right number. So I use number 1!")

            message.channel.send({ embeds: [embed] })

            userinput = 1;
        }
        setTimeout(() => {
            searchEmbed.delete();
        }, (client.ws.ping))
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

        message.channel.send({ embeds: [embed] })
    }

    return client.distube.play(message, result[userinput - 1].url);
}