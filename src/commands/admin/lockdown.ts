import Command from '../../typings/command';

const LockCommand: Command = {
    name: 'lockdown',
    description: 'Lock down a server',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(
                "**You need `MANAGE_CHANNELS` permission to use this command**"
            );

        const role = message.guild?.roles.everyone;

        const perms = role?.permissions.toArray();

        const newPerms = perms?.filter((perm) => perm !== "SEND_MESSAGES");

        await role?.edit({ permissions: newPerms });

        message.channel.send(
            "**:lock: Locked down the Server! Use `unlockdown` command to Unlock the Lockdown!**"
        );

    },
}

export default LockCommand;