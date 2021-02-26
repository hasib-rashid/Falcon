const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");

module.exports = class CatCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "cat",
            aliases: [],
            group: "general",
            memberName: "cat",
            description: "Get a Pic of an adorable cat!",
            details: oneLine`
                Get a Pic of an adorable cat!
            `,
            examples: ["!cat"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        try {
            const { body } = await request.get(
                "https://api.thecatapi.com/v1/images/search"
            );

            let embed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL())
                .setTitle("Cat!")
                .setDescription("Here's your random cat!")
                .setColor("BLUE")
                .setImage(body[0].url);

            message.channel.send(embed);
        } catch (err) {
            console.error(err);
        }
    }
};
