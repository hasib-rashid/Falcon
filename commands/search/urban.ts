import { MessageEmbed } from 'discord.js';
import Command from '../../constants/command';
import { formatNumber, shorten } from '../../util/Util';

const UrbanCommand: Command = {
    name: 'urban',
    description: 'Search Urban for all the meaning',
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
            const { body } = await request
                .get("http://api.urbandictionary.com/v0/define")
                .query({ term: args[0] });
            if (!body.list.length)
                return message.channel.send("Could not find any results.");
            const data = body.list[0];
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setAuthor(
                    "Urban Dictionary",
                    "https://i.imgur.com/Fo0nRTe.png",
                    "https://www.urbandictionary.com/"
                )
                .setURL(data.permalink)
                .setTitle(data.word)
                .setDescription(shorten(data.definition.replace(/\[|\]/g, "")))
                .setFooter(
                    `👍 ${formatNumber(data.thumbs_up)} 👎 ${formatNumber(
                        data.thumbs_down
                    )}`
                )
                .setTimestamp(new Date(data.written_on))
                .addField(
                    "❯ Example",
                    data.example
                        ? shorten(data.example.replace(/\[|\]/g, ""), 1000)
                        : "None"
                );
            return message.channel.send(embed);
        } catch (err) {
            console.error(err);
        }
    },
}

export default UrbanCommand;