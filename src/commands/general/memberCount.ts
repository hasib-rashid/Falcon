import Command from '../../typings/command';
import { MessageEmbed } from 'discord.js'

const MemberCountCommand: Command = {
    name: 'memberCount',
    description: 'Count the number of members here',
    aliases: [
        'member-count', 'membercount', 'users', 'user-count', 'userCount'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const embed = new MessageEmbed()
            .setAuthor(message.guild?.name, message.guild?.iconURL() || "https://media.pocketgamer.biz/2021/5/110514/discord-new-logo-2021-r225x.jpg")
            .setTitle("Number of Users: " + message.guild?.memberCount)
            .setColor("BLUE");

        message.channel.send(embed);
    },
}

export default MemberCountCommand;