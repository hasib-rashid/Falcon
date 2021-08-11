import Command from '../../typings/command';
import { default as axios } from 'axios'

const NPCCommand: Command = {
    name: 'npc',
    description: 'Try to make a meme with NPC',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const user = message.mentions.users.first()?.displayAvatarURL() || message.guild?.members.cache.get(args[0])?.user.displayAvatarURL() || message.author.displayAvatarURL()

        if (args[0]) return message.channel.send("**Please insert two Text**")
        if (args[1]) return message.channel.send("**Please insert two Text**")

        message.channel.send(`https://vacefron.nl/api/npc?text1=${args[0]}&text2=${args[1]}`)
    },
}

export default NPCCommand;