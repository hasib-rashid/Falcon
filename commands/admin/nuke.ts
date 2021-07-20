import Command from '../../constants/command';

const NukeCommand: Command = {
    name: 'nuke',
    description: 'Nuke this channel',
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

export default NukeCommand;