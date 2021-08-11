import Command from '../../typings/command';

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
        if (!message.member?.hasPermission("BAN_MEMBERS"))
            return message.channel.send(
                "**You need `BAN_MEMBERS` permission to use this command**"
            );

        const role = message.mentions.roles.first() || message.guild?.roles.cache.get(args[0])

        if (!role) return message.channel.send("**Please specify a role to delete**")

        // @ts-ignore
        message.guild?.roles.cache.get(role?.id)?.delete()

        message.channel.send("**Succesfully Deleted the role**")
    },
}

export default DeleteRoleCommand;