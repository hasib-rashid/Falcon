const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;

const djs = require("djs-economy");

module.exports = class AddPointCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "add-point",
            aliases: [],
            group: "moderation",
            memberName: "add-point",
            description: "Add a persons point using this command!",
            details: oneLine`
                Add a persons point using this command!
            `,
            examples: ["!add-point <user> <point>"],
            args: [
                {
                    key: "user",
                    type: "user",
                    prompt:
                        "Please specify the user you want to add the points to",
                },
                {
                    key: "point",
                    type: "string",
                    prompt: "Please specify how much point do you want to add!",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { user, point }) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.channel.send(":no_entry: Insufficient Permissions");
        }

        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTitle(
                `Successfully added ${point} to ${user} by ${message.author.username}`
            );
        djs.AddCash(user.id, point);
        message.channel.send(embed);
    }
};
