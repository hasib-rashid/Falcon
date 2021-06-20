import Command from '../../constants/command';
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
        const randomIndex = Math.floor(Math.random() * json.length);

        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setTitle("8ball")
            .addField(":grey_question:", args.join(" "))
            .addField(":8ball:", json[randomIndex])
            .setColor("GREEN");

        message.channel.send(embed);
    },
}

export default EightBallCommand;