const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const axios = require("axios").default;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "decode",
            aliases: [],
            group: "general",
            memberName: "decode",
            description: "Convert something into Decode",
            details: oneLine`
                Convert something into Decode
            `,
            examples: ["!decode <text/anything>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const args = message.content.split(" ").slice(1);

        const url = `http://some-random-api.ml/binary?decode=${args}`;

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occured, please try again!`);
        }

        const embed = new Discord.MessageEmbed()
            .setTitle("Decode Binary")
            .setDescription(data.binary);

        await message.channel.send(embed);
    }
};
