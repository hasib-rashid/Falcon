const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const axios = require("axios").default;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "binary",
            aliases: [],
            group: "general",
            memberName: "binary",
            description: "Convert something into Binary",
            details: oneLine`
                Convert something into Binary
            `,
            examples: ["!binary <text/anything>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const args = message.content.split(" ").slice(1);

        const url = `http://some-random-api.ml/binary?text=${args.join(" ")}`;

        try {
            axios.request(url).then(function (response) {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Binary")
                    .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL()
                    )
                    .setColor("#118eed")
                    .setDescription(response.data.binary);

                message.channel.send(embed);
            });
        } catch (err) {
            message.channel.send(
                "**An unexpected Error occured. Please put the Correct Syntax.**"
            );
        }
    }
};
