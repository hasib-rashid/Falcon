import Command from '../../constants/command';

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
        // @ts-ignore
        message.channel.updateOverwrite(message.guild?.roles.everyone, { SEND_MESSAGES: true }).then(() => {
            message.channel.send('**Channel has been Unlocked**');
        }).catch((error: any) => {
            console.log(error);
        });
    },
}

export default UnlockCommand;