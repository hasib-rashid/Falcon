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

    },
}

export default CreateRoleCommand;