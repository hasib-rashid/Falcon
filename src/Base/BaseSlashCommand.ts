import { ApplicationCommandData, CommandInteraction } from "discord.js";
import CodeFictionist from "./Client";

export default abstract class BaseSlashCommand {
	public config: ApplicationCommandData = {
		name: "",
		description: "",
	};
	public client: CodeFictionist;

	constructor(client: CodeFictionist, commandConfig: ApplicationCommandData) {
		this.client = client;
		Object.assign(this.config, commandConfig);

		Object.defineProperty(this, "client", {
			configurable: true,
			enumerable: false,
			writable: true,
		});
	}

	// eslint-disable-next-line no-unused-vars
	abstract run(interaction: CommandInteraction): Promise<any>;
}