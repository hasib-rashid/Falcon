import Command from '../../constants/command';

const RemoveRole: Command = {
    name: 'removerole',
    description: 'Remove a Role from a user',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {

    },
}

export default RemoveRole;