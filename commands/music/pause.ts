import Command from '../../constants/command';

const PauseCommand: Command = {
    name: 'pause',
    description: 'Pause a song in Falcon',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        //Code Here!!!!
    },
}

export default PauseCommand;