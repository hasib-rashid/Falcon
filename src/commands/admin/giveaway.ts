import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import Nuggies from 'nuggies'

export const name = 'giveaway'
export const category = 'admin'
export const description = 'Giveaway something'
export const aliases = ["gway", "gw"]
export const userPermissions: PermissionResolvable = "MANAGE_GUILD"

export const run: RunFunction = async (client, message, args) => {
    let prize
    let winners
    let endAfter
    let requirements
    let channel

    message.channel.send("**What should be the prize of the giveaway. You have 30 seconds to answer this.**")
    await message.channel.awaitMessages(m => m.author.id == message.author.id,
        { max: 1, time: 30000 }).then(collected => {
            prize = collected.first()?.content
        }).catch(() => {
            message.reply('**No answer after 30 seconds, operation canceled.**');
        })

    message.channel.send("**How many winners will be there in this giveaway? You have 30 seconds to answer this.**")
    await message.channel.awaitMessages(m => m.author.id == message.author.id,
        { max: 1, time: 30000 }).then(collected => {
            winners = collected.first()?.content
        }).catch(() => {
            message.reply('**No answer after 30 seconds, operation canceled.**');
        })

    message.channel.send("**After how long will the giveaway end? You have 30 seconds to answer this.**")
    await message.channel.awaitMessages(m => m.author.id == message.author.id,
        { max: 1, time: 30000 }).then(collected => {
            endAfter = collected.first()?.content
        }).catch(() => {
            message.reply('**No answer after 30 seconds, operation canceled.**');
        })

    message.channel.send("**What are the requirements of this giveaway? Type 'nothing' to skip. You have 30 seconds to answer this.**")
    await message.channel.awaitMessages(m => m.author.id == message.author.id,
        { max: 1, time: 30000 }).then(collected => {
            requirements = collected.first()?.content
        }).catch(() => {
            message.reply('**No answer after 30 seconds, operation canceled.**');
        })

    message.channel.send("**What is the channel this giveaway will happen? Type 'here' to do the giveaway here. You have 30 seconds to answer this.**")
    await message.channel.awaitMessages(m => m.author.id == message.author.id,
        { max: 1, time: 30000 }).then(collected => {
            if (collected.first()?.content === "here") {
                channel = message.channel.id
            } else {
                channel = collected.first()?.content
            }
        }).catch(() => {
            message.reply('**No answer after 30 seconds, operation canceled.**');
        })

    Nuggies.giveaways.create({
        message: message,
        prize: prize,
        host: message.author.id,
        winners: winners,
        endAfter: endAfter,
        requirements: requirements,
        channel: channel,
    });
}