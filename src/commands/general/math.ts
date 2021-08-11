import Command from '../../typings/command';
import { evaluate } from 'mathjs'
import { MessageEmbed } from 'discord.js'

const MathCommand: Command = {
    name: 'math',
    description: 'Calculate anything with a Maths',
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
            if (!args[0]) return message.channel.send("**Please specify something to Math**")

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

            message.channel.send({ embeds: [embed] })
        } catch (err) {
            message.channel.send("**There has been a error. Please try again with a valid math logic**")
        }
    },
}

export default MathCommand;