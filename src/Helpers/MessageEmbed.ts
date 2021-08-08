import { MessageEmbed, User } from "discord.js";

export default function NewMessageEmbed(user: User, colour?: string) {
    return new MessageEmbed()
        .setTimestamp()
        .setColor(colour || "GREEN")
        .setAuthor(`${user.tag}`, user.displayAvatarURL({ dynamic: true }));
};