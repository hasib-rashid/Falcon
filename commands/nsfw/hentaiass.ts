import Command from '../../constants/command';

const HentaiAssCommand: Command = {
    name: 'hentaiass',
    description: 'NSFW hentaiass',
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

export default HentaiAssCommand;