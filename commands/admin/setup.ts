import Command from '../../constants/command';

const SetupCommand: Command = {
    name: 'setup',
    description: 'Setup the server',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        if (!message.member?.hasPermission("MANAGE_GUILD"))
            return message.channel.send(
                "**You need `MANAGE_GUILD` permission to use this command**"
            );
    },
}

export default SetupCommand;