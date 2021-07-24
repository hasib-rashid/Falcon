import Command from '../../constants/command';

const CreateChannelCommand: Command = {
    name: 'createchannel',
    description: 'Create a Channel',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const channelName = args[0]

        message.guild?.channels.create(channelName)
        message.channel.send("**Successfully Created the Channel**")
    },
}

export default CreateChannelCommand;