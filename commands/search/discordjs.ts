import Command from '../../constants/command';
import { default as axios } from 'axios';
import { MessageEmbed } from 'discord.js';

const DiscordJSCommand: Command = {
    name: 'djs',
    description: 'Search the Djs docs here',
    aliases: [
        'discord.js', 'discordjs'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        let version = args[1]

        if (!version) {
            version = "stable"
        }
        axios.get(`https://djsdocs.sorta.moe/v2/embed?src=${encodeURIComponent(version)}&q=${encodeURIComponent(args[0])}`).then((res) => {
            console.log(res.data)

            const embed = new MessageEmbed(res.data)

            message.channel.send(embed)
        })
    },
}

export default DiscordJSCommand;