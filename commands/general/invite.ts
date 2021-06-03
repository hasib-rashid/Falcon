import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'

const InviteCommand: Command = {
    name: 'invite',
    description: 'Invite people with this links!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const embed = new MessageEmbed()
            .setAuthor(
                message.author.username,
                message.author.displayAvatarURL()
            )
            .setColor("RANDOM")
            .setTitle("Invite CodeVert!")
            .setTimestamp()
            .addField(
                "[Support Server](https://discord.gg/X2dDeENmJh)",
                "[Invite Me](https://discord.com/api/oauth2/authorize?client_id=799543154692718602&permissions=8&scope=bot)"
            );


        message.channel.send(embed);
    },
}

export default InviteCommand;