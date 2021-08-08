import Command from '../../constants/command';

const PlayCommand: Command = {
    name: 'play',
    description: 'Play a music in Falcon',
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
                "**Please sepcify which song do i play!**"
            );

        message.channel.send(
            "<:youtube:864559346137956402> **Searching** :mag_right: `" +
            `${args.join(" ")}` +
            "`"
        );

        client.distube.play(message, args.join(" "));
    },
}

export default PlayCommand;