import Command from '../../constants/command';

const NekoPussy: Command = {
    name: 'nekopussy',
    description: 'NSFW nekopussy',
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

export default NekoPussy;