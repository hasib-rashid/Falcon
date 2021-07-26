import Command from '../../constants/command';

const KitsuneCommand: Command = {
    name: 'kitsune',
    description: 'NSFW kitsune',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: true,
    cooldown: 0,

    async run(client, message, args) {

    },
}

export default KitsuneCommand;