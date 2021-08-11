import Command from '../../typings/command';

const UnlockdownCommand: Command = {
    name: 'unlockdown',
    description: 'Unlockdown the whole server',
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

        perms?.push("SEND_MESSAGES");
        await role?.edit({ permissions: perms });

        message.channel.send(
            "**:unlock: Unlocked the Server! Members can chat now!**"
        );
    },
}

export default UnlockdownCommand;