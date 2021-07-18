import Command from '../../constants/command';

const AddRoleCommand: Command = {
    name: 'addrole',
    description: 'Add a role for a user',
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

export default AddRoleCommand;