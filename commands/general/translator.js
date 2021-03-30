const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const language = require("./translator/langOptions.js");
const translate = require("@vitalets/google-translate-api");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "translate",
            aliases: [],
            group: "general",
            memberName: "translate",
            description: "Translate anything in any language",
            details: oneLine`
                Translate anything in any language
            `,
            examples: ["!translate <from> <to> <text_of_from>"],
            args: [
                {
                    key: "argFrom",
                    type: "string",
                    prompt:
                        "What is the language from which I am going to translate from?. example: `!translate english japanese Hello World`",
                },
                {
                    key: "argTo",
                    type: "string",
                    prompt:
                        "What is the language to which am I going to translate to?. example: `!translate english japanese Hello World`",
                },
                {
                    key: "text",
                    type: "string",
                    prompt:
                        "What is the text that I am going to translate?. example: `!translate english japanese Hello World`",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message, { argFrom, argTo, text }) {
        try {
            let lang_from = language.filter((ele) => ele.name === argFrom)[0]
                .abrv;
            let lang_to = language.filter((ele) => ele.name === argTo)[0].abrv;

            const translate_image =
                "https://play-lh.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA=s180-rw";

            translate(text, { from: lang_from, to: lang_to })
                .then((res) =>
                    message.channel.send(
                        new Discord.MessageEmbed()
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
                .catch((err) => console.error(err));
        } catch (err) {
            message.channel.send(
                ":no_entry: Please Specify the correct language. Format Incorrect!"
            );
        }
    }
};
