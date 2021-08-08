import Command from '../../constants/command';
import BlackList from '../../models/BlackListUsers'

const BlackListCommand: Command = {
    name: 'blacklist',
    description: 'Blacklist someone from Falcon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: true,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const user = client.users.cache.get(args[0])
        const reason = args.slice(1).join(' ') || "No Reason";

        BlackList.create({ userID: args[0], time: Date.now(), reason: reason })
        message.channel.send(`${user?.username} was successfully Blacklisted.`)
    },
}

export default BlackListCommand;