import Command from '../../constants/command';

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
            let color
            let name

            message.channel.send("**What should be the color of the role. Please put in a css hex color. You have 30 seconds to answer this.**")
            await message.channel.awaitMessages(m => m.author.id == message.author.id,
                { max: 1, time: 30000 }).then(collected => {
                    color = collected.first()?.content
                }).catch(() => {
                    message.reply('**No answer after 30 seconds, operation canceled.**');
                })

            message.channel.send("**What should be the name of the Role. You have 30 seconds to answer this.**")
            await message.channel.awaitMessages(m => m.author.id == message.author.id,
                { max: 1, time: 30000 }).then(collected => {
                    name = collected.first()?.content
                }).catch(() => {
                    message.reply('**No answer after 30 seconds, operation canceled.**');
                })

            message.guild?.roles.create({ data: { color: color || "", name: name || "" } })

            message.channel.send("**Successfully created the Role**")
        } catch (err) {
            message.channel.send("**There has been a error. Please check if everything is right and try again.**")
        }
    },
}

export default CreateRoleCommand;