import { RunFunction } from '../../interfaces/Command';

export const name = 'queue'
export const category = 'music'
export const description = 'Look at the queue'

export const run: RunFunction = async (client, message, args) => {
    try {
        const queue = client.distube.getQueue(message);
        const embed = new MessageEmbed()
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
}