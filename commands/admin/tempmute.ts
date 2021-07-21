import Command from '../../constants/command';

const TempMuteCommand: Command = {
    name: 'mute',
    description: 'Temporarily Mute a Member',
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

export default TempMuteCommand;