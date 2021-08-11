import Command from '../../typings/command';

const UnlockCommand: Command = {
    name: 'unlock',
    description: 'Unlock the locked Channel',
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

        // @ts-ignore
        message.channel.updateOverwrite(message.guild?.roles.everyone, { SEND_MESSAGES: true }).then(() => {
            message.channel.send('**Channel has been Unlocked**');
        }).catch((error: any) => {
            console.log(error);
        });
    },
}

export default UnlockCommand;