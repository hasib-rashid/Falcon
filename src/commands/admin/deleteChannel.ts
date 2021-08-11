import Command from '../../typings/command';

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
        if (!message.member?.permissions.has("MANAGE_CHANNELS"))
            return message.channel.send(
                "**You need `MANAGE_CHANNELS` permission to use this command**"
            );
        const channel = message.mentions.channels.first() || message.guild?.channels.cache.get(args[0])

        if (!channel) return message.channel.send("**Please mention a channel to delete**")

        message.guild?.channels.cache.get(channel?.id)?.delete()

        message.channel.send("**Successfully Deleted the Channel**")
    },
}

export default CreateChannelCommand;