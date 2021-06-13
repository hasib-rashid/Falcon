import Command from '../../constants/command';
import { Minigames } from 'discord-multipurpose'

const AkiCommand: Command = {
    name: 'aki',
    description: 'description',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const aki = new Minigames.Akinator(message, "en")

        aki.run()
    }
}

export default AkiCommand;