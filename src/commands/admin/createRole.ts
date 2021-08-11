import { Message } from 'discord.js';
import Command from '../../typings/command';

const CreateRoleCommand: Command = {
    name: 'createrole',
    description: 'Create a role in this server',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            if (!message.member?.permissions.has("MANAGE_ROLES"))
                return message.channel.send(
                    "**You need `MANAGE_ROLES` permission to use this command**"
                );

            let color
            let name

            message.channel.send("**What should be the color of the role. Please put in a css hex color. You have 30 seconds to answer this.**")
            
            await message.channel.awaitMessages({ max: 1, time: 30000, filter: (m) => m.author.id === message.author.id }).then((collected) => {
                color = collected.first().content
            }).catch(() => {
                message.reply('**No answer after 30 seconds, operation canceled.**');
            })

            message.channel.send("**What should be the name of the Role. You have 30 seconds to answer this.**")
            await message.channel.awaitMessages({ filter: m => m.author.id == message.author.id ,max: 1, time: 30000 }).then(collected => {
                name = collected.first()?.content
            }).catch(() => {
                message.reply('**No answer after 30 seconds, operation canceled.**');
            })

            message.guild?.roles.create({ name: name, color: color })

            message.channel.send("**Sucessfully Created a Role.**")

        } catch (err) {
            message.channel.send("**There has been a error. Please check if everything is right and try again.**")
        } finally {
            message.channel.send("**Successfully created the Role**")
        }
    },
}

export default CreateRoleCommand;