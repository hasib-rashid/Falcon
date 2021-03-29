const Discord = require("discord.js");
const commando = require("discord.js-commando");
const { oneLine, stripIndents } = require("common-tags");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "changelog",
            aliases: [],
            group: "general",
            memberName: "changelog",
            description: "See the change log of the Newest version of CodeVert",
            details: oneLine`
                See the change log of the Newest version of CodeVert
            `,
            examples: ["!changeLog"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        const embed = new Discord.MessageEmbed()
            .setAuthor(
                this.client.user.username,
                this.client.user.displayAvatarURL()
            )
            .setTitle("ChangeLog V1.0.0. The Beginning!")
            .setDescription(
                stripIndents(
                    `This is the Begining of CodeVert. SOOO Excited. An All in one Discord Bot!
                    
                    Added a Buncha Moderation Commands
                    Fully end to end music experience
                    7 new Games
                    Translation Feature
                    Searching anything you want
                    Do Giveaways
                    Transcript
                    Ticket System
                    Nuke Command
                    Reaction Roles
                    Welcome Message
                    
                    And Much More........`
                )
            )
            .setColor("#0873ff")
            .setTimestamp()
            .setFooter("© CodeVert");

        message.channel.send(embed);
    }
};
