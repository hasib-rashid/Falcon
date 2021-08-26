import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'ping'
export const category = 'misc'
export const description = 'Check the Ping of Falcon'

export const run: RunFunction = async (client, message, args) => {
	message.channel.send("Loading data! :thinking:").then(async (msg) => {
		const pingEmbed = new MessageEmbed()
			.setTitle("Ping")
			.setAuthor(message.author.username, message.author.displayAvatarURL())
			.setDescription(
				`**🏓 Pong! Your Latency is \`${msg.createdTimestamp - message.createdTimestamp
				}ms\` and API Latency is \`${Math.round(
					client.ws.ping
				)}\` ms!**\r`
			)
			.setFooter(client.user.username, client.user.displayAvatarURL())

		if (client.ws.ping < 120) pingEmbed.setColor("GREEN");

		if (client.ws.ping < 500) pingEmbed.setColor("YELLOW");

		if (client.ws.ping > 500) pingEmbed.setColor("RED");

		message.channel.send({ embeds: [pingEmbed] })
	});
}