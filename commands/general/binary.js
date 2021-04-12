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

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occured, please try again!`);
        }

        const embed = new Discord.MessageEmbed()
            .setTitle("Binary")
            .setDescription(data.binary);

        await message.channel.send(embed);
    }
};
