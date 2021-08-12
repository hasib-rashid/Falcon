import Command from '../../typings/command';
//@ts-ignore
import Nuggies from 'nuggies';
import discordbuttons from 'discord-buttons'

const DropCommand: Command = {
    name: 'drop',
    description: 'Drop a Prize Pool',
    aliases: [],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        console.log("Dropped")
        if (!message.member?.hasPermission("MANAGE_MESSAGES"))
            return message.channel.send(
                "**You need `MANAGE_MESSAGES` permission to use this command**"
            );

        let prize
        let channel

        message.channel.send("**What should be the prize of the giveaway. You have 30 seconds to answer this.**")
        await message.channel.awaitMessages(m => m.author.id == message.author.id,
            { max: 1, time: 30000 }).then(collected => {
                prize = collected.first()?.content
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

        Nuggies.giveaways.drop({
            message: message,
            prize: prize,
            host: message.author.id,
            channel: channel,
        });
    },
}

export default DropCommand;