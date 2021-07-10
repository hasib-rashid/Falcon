import Command from '../../constants/command';

const WeatherCommand: Command = {
    name: 'weather',
    description: 'Watch the weather anywhere!',
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

export default WeatherCommand;