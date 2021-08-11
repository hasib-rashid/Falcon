import Command from '../../typings/command';
import { MessageEmbed } from 'discord.js'
import * as json from "../../assets/JSON/8ball.json"

const EightBallCommand: Command = {
    name: '8ball',
    description: 'Guess your luck with 8ball',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        // @ts-ignore
        const randomIndex = Math.floor(Math.random() * json.default.length);

        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle("8ball")
            .addField(":grey_question:", args.join(" "))
            // @ts-ignore
            .addField(":8ball:", json.default[randomIndex])
            .setColor("GREEN");

        message.channel.send({ embeds: [embed] });
    },
}

export default EightBallCommand;