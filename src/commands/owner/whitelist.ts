import Command from '../../typings/command';
import BlackList from '../../models/BlackListUsers'

const WhitelistCommand: Command = {
    name: 'whitelist',
    description: 'Whitelist a user',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: true,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        BlackList.destroy({ where: { userID: args[0] } })

        message.channel.send(`${client.users.cache.get(args[0])?.username} has been sucessfully whitelisted.`)
    },
}

export default WhitelistCommand;