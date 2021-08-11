import Command from '../../typings/command';
import { MessageEmbed } from 'discord.js'
import { stripIndents } from 'common-tags'

const ChangeLogCommand: Command = {
    name: 'changelog',
    description: 'Watch the changelog of the bot here!',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        const embed = new MessageEmbed()
            .setAuthor(
                client.user?.username,
                client.user?.displayAvatarURL()
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
            .setFooter("© Falcon");

        message.channel.send(embed);
    },
}

export default ChangeLogCommand;