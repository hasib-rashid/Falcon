import Command from '../../constants/command';

const HentaiCommand: Command = {
    name: 'hentai',
    description: 'NSFW hentai',
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

export default HentaiCommand;