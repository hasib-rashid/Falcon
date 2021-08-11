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

        const impostor = [true, false, false, false]

        const random_color = colors[Math.floor(Math.random() * colors.length)];
        const random_impostor = impostor[Math.floor(Math.random() * impostor.length)];

        const user = message.mentions.members?.first()?.user.username || message.guild?.members.cache.get(args[0])?.user.username || message.author.username

        message.channel.send(`https://vacefron.nl/api/ejected?name=${user}&impostor=${random_impostor}&crewmate=${random_color}`)
    },
}

export default EjectCommand;