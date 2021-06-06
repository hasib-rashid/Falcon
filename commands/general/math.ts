import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'
import { evaluate } from 'mathjs'

const MathCommand: Command = {
    name: 'math',
    description: 'Do maths in this command',
    aliases: [
        'calculate', 'calc'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        try {
            const result = evaluate(args.join(" "))
            const embed = new MessageEmbed()
                .setColor("BLUE")
                .setAuthor(message.author.username, message.author.displayAvatarURL())
                .setTitle("Calculator | Math")
                .setDescription("Do Maths in Discord.")
                .setFooter("Powered by MathJS")
                .setTimestamp()
                .addField("Question", `\`\`\`css\n${args.join(" ")}\`\`\``)
                .addField("Answer", `\`\`\`css\n${result}\`\`\``);

            message.channel.send(embed)
        } catch (err) {
            message.channel.send("**There has been a error. Please try again with a valid math logic**")
        }
    },
}

export default MathCommand;