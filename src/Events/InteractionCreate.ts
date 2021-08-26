import { CommandInteraction, Interaction } from "discord.js";
import BaseEvent from "../base/BaseEvent";
import Falcon from "../base/Client";

export default class InteractionCreateEvent extends BaseEvent {
	constructor(client: Falcon) {
		super(client, "interactionCreate");
	}

	public async run(interaction: Interaction) {
		if (interaction.isCommand()) await this.__handleCommand(interaction);
	}

	private async __handleCommand(interaction: CommandInteraction) {
		const command = this.client.slashcommands.get(interaction.commandName);

		await interaction.deferReply();

		try {
			await command?.run(interaction);
		}
		catch (err) {
			interaction.editReply(`${":x:"} An error occurred while running the command`);

			this.client.logger.error("client/commands", (err as Error).message, (err as Error).stack);
		}
	}
}