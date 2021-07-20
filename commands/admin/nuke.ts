import { TextChannel } from 'discord.js';
import Command from '../../constants/command';

const NukeCommand: Command = {
    name: 'nuke',
    description: 'Nuke this channel',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(
                "**You need `MANAGE_CHANNELS` permission to use this command**"
            );

        // @ts-ignore
        message.channel.clone().then((channel: TextChannel) => {
            // @ts-ignore
            channel.setPosition(message.channel.position);
            channel.send(
                "Successfully Nuked this channel! \nhttps://media2.giphy.com/media/oe33xf3B50fsc/giphy.gif"
            );
        });
        message.channel.delete();
    },
}

export default NukeCommand;