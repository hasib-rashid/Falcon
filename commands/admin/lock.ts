import Command from '../../constants/command';

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
        // @ts-ignore
        message.channel.updateOverwrite(message.guild?.roles.everyone, { SEND_MESSAGES: false }).then(() => {
            message.channel.send('**Channel has been locked**');
        }).catch((error: any) => {
            console.log(error);
        });
    },
}

export default LockCommand;