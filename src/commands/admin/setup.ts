import { RunFunction } from '../../interfaces/Command';
import { MessageEmbed, PermissionResolvable } from 'discord.js'

export const name = 'setup'
export const category = 'admin'
export const description = 'Setup the server'
export const userPermissions: PermissionResolvable = "MANAGE_GUILD"

export const run: RunFunction = async (client, message, args) => {
    const embed = new MessageEmbed()
        .setAuthor(message.guild?.name, message.guild?.iconURL() || "")
        .setTitle(`Setup ${message.guild?.name}`)
        .setColor("BLUE")
        .setTimestamp()
        .setFooter("Falcon Bot")
        .setDescription(`
        **prefix** - Change the prefix of the server.

        ***Note: More are coming as the Bot Updates.***
    `)

    message.channel.send({ embeds: [embed] })
}