import { RunFunction } from '../../interfaces/Command';
import { GeneralCommands } from '../../client/Client'
import { MessageEmbed } from 'discord.js';

export const name = 'help'
export const category = 'general'
export const description = 'Helping'

export const run: RunFunction = async (client, message, args) => {
    if (args[0] === "general") {
        const embed = new MessageEmbed()
            .setAuthor(
                message.author.username,
                message.author.displayAvatarURL()
            )
            .setTitle(":smiley: General")
            .setDescription(GeneralCommands)
            .setColor("#0887ff");

        message.channel.send(embed);
    }
}