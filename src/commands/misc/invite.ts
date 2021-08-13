import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../../interfaces/Command'; 

export const name = 'invite'
export const category = 'misc'
export const description = 'Invite Falcon'

export const run: RunFunction = async (client, message, args) => {
    const embed = new MessageEmbed()
        .setAuthor(
            message.author.username,
            message.author.displayAvatarURL()
        )
        .setColor("BLUE")
        .setTitle("Invite CodeVert!")
        .setTimestamp()
        .setDescription(
            "[Support Server](https://discord.gg/X2dDeENmJh)\r[Invite Me](https://discord.com/api/oauth2/authorize?client_id=799543154692718602&permissions=8&scope=bot)"
        );


    message.channel.send(embed);
}