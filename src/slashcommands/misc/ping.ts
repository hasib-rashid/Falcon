import { CommandInteraction, MessageEmbed } from "discord.js";
import BaseSlashCommand from "../../base/BaseSlashCommand";
import Falcon from "../../base/Client";

export default class PingCommand extends BaseSlashCommand {
	constructor(client: Falcon) {
		super(client, {
			name: "ping",
			description: "Get the API Latency of the Bot",
		});
	}

	public async run(interaction: CommandInteraction) {
		interaction.editReply("Loading data! :thinking:").then(async (msg) => {
			const pingEmbed = new MessageEmbed()
				.setTitle("Ping")
				.setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
				.setDescription(
					`**🏓 Pong! The API Latency is \`${Math.round(
						this.client.ws.ping
					)}\` ms!**\r`
				)
				.setFooter(interaction.user.username, interaction.user.displayAvatarURL())

			if (this.client.ws.ping < 120) pingEmbed.setColor("GREEN");

			if (this.client.ws.ping < 500) pingEmbed.setColor("YELLOW");

			if (this.client.ws.ping > 500) pingEmbed.setColor("RED");

			interaction.editReply({ embeds: [pingEmbed] })
		});
	}
};