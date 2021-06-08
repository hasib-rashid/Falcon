import Command from '../../constants/command';
import { MessageEmbed } from 'discord.js'
import { default as translate } from "@vitalets/google-translate-api"

const TranslateCommand: Command = {
    name: 'translate',
    description: 'Translate anything from any language',
    aliases: [
        'translator'
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const argFrom = args[0]
        const argTo = args[1]
        const text = args.join("")

        const translate_image =
            "https://play-lh.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA=s180-rw";

        translate(text, { from: argFrom, to: argTo })
            .then((res) =>
                message.channel.send(
                    new MessageEmbed()
                        .setAuthor("Google Translate", translate_image)
                        .setTitle("Translating....")
                        .addField(`From: ${argFrom}:`, text)
                        .addField(`To ${argTo}:`, res.text)
                        .setColor("#4287f5")
                        .setFooter(
                            "Powered By Google Translate",
                            translate_image
                        )
                )
            )
            .catch((err) => message.channel.send(
                ":no_entry: Please Specify the correct language. Example: `.translate en nl Hello there`"
            ))
    },
}

export default TranslateCommand;