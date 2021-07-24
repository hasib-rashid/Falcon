import Command from '../../constants/command';

const CreateChannelCommand: Command = {
    name: 'deletechannel',
    description: 'Delete a Channel',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const channel = message.mentions.channels.first() || message.guild?.channels.cache.get(args[0])

        if (!channel) return message.channel.send("**Please mention a channel to delete**")

        // @ts-ignore
        message.guild?.channels.cache.get(channel?.id)?.delete()

        message.channel.send("**Successfully Deleted the Channel**")
    },
}

export default CreateChannelCommand;