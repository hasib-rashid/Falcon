import { RunFunction } from '../../interfaces/Command';
import Nuggies from 'nuggies'
import { Message, PermissionResolvable } from 'discord.js';

export const name = 'drop'
export const category = 'admin'
export const description = 'Drop a item in Discord'
export const userPermissions: PermissionResolvable = "MANAGE_GUILD"

export const run: RunFunction = async (client, message, args) => {
    let prize
    let channel

    message.channel.send("**What should be the prize of the giveaway. You have 30 seconds to answer this.**")
    await message.channel.awaitMessages({ filter: (m: Message) => m.author.id === message.author.id, max: 1, time: 30000 }).then(collected => {
        if (collected.first().author.id !== message.author.id) return;
        prize = collected.first()?.content
    }).catch(() => {
        message.reply('**No answer after 30 seconds, operation canceled.**');
    })

    message.channel.send("**What is the channel this giveaway will happen? Type 'here' to do the giveaway here. You have 30 seconds to answer this.**")
    await message.channel.awaitMessages({ filter: (m: Message) => m.author.id === message.author.id, max: 1, time: 30000 }).then(collected => {
        if (collected.first().author.id !== message.author.id) return;
        if (collected.first()?.content === "here") {
            channel = message.channel.id
        } else {
            channel = collected.first()?.content
        }
    }).catch(() => {
        message.reply('**No answer after 30 seconds, operation canceled.**');
    })

    Nuggies.giveaways.drop({
        message: message,
        prize: prize,
        host: message.author.id,
        channel: channel,
    });
}