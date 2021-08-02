import Command from '../../constants/command';

const SetPrefixCommand: Command = {
    name: 'setprefix',
    description: 'Set the prefix to something else',
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

export default SetPrefixCommand;