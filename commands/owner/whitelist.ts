import Command from '../../constants/command';
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
    },
}

export default WhitelistCommand;