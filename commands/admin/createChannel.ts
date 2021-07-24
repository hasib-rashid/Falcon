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

    },
}

export default CreateChannelCommand;