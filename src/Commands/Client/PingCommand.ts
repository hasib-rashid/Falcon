import { CommandInteraction } from "discord.js";
import BaseSlashCommand from "../../Base/BaseSlashCommand";
import CodeFictionist from "../../Base/Client";

export default class PingCommand extends BaseSlashCommand {
	constructor(client: CodeFictionist) {
		super(client, {
			name: "ping",
			description: "Get the API Latency of the Bot",
		});
	}

	public async run(interaction: CommandInteraction) {
		interaction.editReply(`WebSocket ping is: ${this.client.ws.ping} ms`);
	}
};