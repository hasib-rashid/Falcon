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
        if (!message.member?.hasPermission("MANAGE_ROLES"))
            return message.channel.send(
                "**You need `MANAGE_ROLES` permission to use this command**"
            );
    },
}

export default AddRoleCommand;