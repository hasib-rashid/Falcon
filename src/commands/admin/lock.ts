import Command from '../../typings/command';

const LockCommand: Command = {
    name: 'lock',
    description: 'Lock the channel',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.permissions.has("MANAGE_CHANNELS"))
            return message.channel.send(
                "**You need `MANAGE_CHANNELS` permission to use this command**"
            );

        // @ts-ignore
        message.channel.updateOverwrite(message.guild?.roles.everyone, { SEND_MESSAGES: false }).then(() => {
            message.channel.send('**Channel has been locked**');
        }).catch((error: any) => {
            console.log(error);
        });
    },
}

export default LockCommand;