import { MessageEmbed } from 'discord.js';
import Song from 'distube/typings/Song';
import Command from '../../constants/command';

const QueueCommand: Command = {
    name: 'queue',
    description: 'Get the Guild Queue',
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
            let queue = client.distube.getQueue(message);

            let embed = new MessageEmbed()
                //@ts-ignore
                .setAuthor(message.guild?.name, message.guild?.iconURL())
                .setTitle("Current Queue")
                .setFooter(
                    client.user?.username,
                    client.user?.displayAvatarURL()
                )
                .setColor("#4287f5");

            embed.setDescription(
                queue.songs
                    .map(
                        (song: Song, id: any) =>
                            `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration
                            }\``
                    )
                    .join("\n")
            );

            message.channel.send(embed);
        } catch (err) {
            console.error(err);
            message.channel.send(
                "**An Unexpected Error Occured. There might be no songs playing.**"
            );
        }
    },
}

export default QueueCommand;