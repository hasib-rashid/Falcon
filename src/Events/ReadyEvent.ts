import BaseEvent from "../Base/BaseEvent";
import CodeFictionist from "../Base/Client";

export default class ReadyEvent extends BaseEvent {
	constructor(client: CodeFictionist) {
		super(client, "ready");
	}

	public async run() {
		this.client.logger.success("client", `Logged in as ${this.client.user?.tag} successfully`);

		// @ts-ignore
		this.client.guilds.cache.get(process.env.GUILD_ID)?.commands.set(
			this.client.commands.map(cmd => cmd.config),
		);
	}
};