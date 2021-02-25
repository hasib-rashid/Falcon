const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const request = require("node-superfetch");

module.exports = class PuppyCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "puppy",
            aliases: ["dog", "doggo"],
            group: "general",
            memberName: "puppy",
            description: "Watch a pic of a sweet Puppy! Awwww",
            details: oneLine`
                Watch a pic of a sweet Puppy! Awwww
            `,
            examples: ["!puppy"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        try {
            const { body } = await request.get(
                "https://dog.ceo/api/breeds/image/random"
            );

            let embed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL())
                .setTitle("Puppy!")
                .setDescription("Here's your random puppy!")
                .setColor("BLUE")
                .setImage(body.message);

            message.channel.send(embed);
        } catch (err) {
            console.error(err);
        }
    }
};
