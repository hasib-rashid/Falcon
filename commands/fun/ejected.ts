import Command from '../../constants/command';

const EjectCommand: Command = {
    name: 'eject',
    description: 'Eject someone off',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const colors = [
            "black",
            "blue",
            "brown",
            "cyan",
            "darkgreen",
            "lime",
            "orange",
            "pink",
            "purple",
            "red",
            "white",
            "yellow"
        ]

        const impostor = [true, false]
    },
}

export default EjectCommand;