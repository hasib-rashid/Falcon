import Command from '../../constants/command';

const CreateRRCommand: Command = {
    name: 'createRR',
    description: 'Create a reaction role',
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

export default CreateRRCommand;