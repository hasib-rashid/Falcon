import Command from '../../constants/command';

const DeleteRoleCommand: Command = {
    name: 'deleterole',
    description: 'Delete a Role',
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

export default DeleteRoleCommand;