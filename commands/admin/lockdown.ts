import Command from '../../constants/command';

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
        const role = message.guild?.roles.everyone

        // @ts-ignore
        message.channel.updateOverwrite(message.guild?.roles.everyone, { SEND_MESSAGES: false }).then(() => {
            message.channel.send("**Successfully Put a Lockdown on the server.**")
        }).catch((error: any) => {
            console.log(error);
        });


    },
}

export default LockCommand;