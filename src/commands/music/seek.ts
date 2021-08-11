import { MessageEmbed } from 'discord.js';
import Command from '../../constants/command';
import { delay } from '../../util/functions';

const SeekCommand: Command = {
    name: 'seek',
    description: 'Seek and move the player to a specific place',
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
            if (!args) {
                message.channel.send(
                    ":no_entry: **Please specify where will I move the song to in seconds?**"
                );
            }

            // @ts-ignore
            await client.distube.seek(message, Number(args[0] * 1000));
            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle("Seeked")
                .setColor("BLUE")
                .setDescription(`Seeked the song to \`${args[0]} seconds\``)

            message.channel.send(embed)

            await delay(5000);
            //@ts-ignore
            await message.channel.bulkDelete(2);
            return;
        } catch (err) {
            message.channel.send(
                "**You are not in a voice channel or a song isnt playing!**"
            );
        }
    },
}

export default SeekCommand;