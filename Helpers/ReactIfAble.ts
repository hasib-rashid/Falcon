import { Message } from "discord.js";

export default async function ReactIfAble(emoji: any, message: Message) {
    if (message.guild && !message.guild.me?.hasPermission("ADD_REACTIONS")) return false;

    const reaction = await message.react(emoji);

    return reaction;
};