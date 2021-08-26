import BaseEvent from "../base/BaseEvent";
import Falcon from "../base/Client";

export default class ReadyEvent extends BaseEvent {
	constructor(client: Falcon) {
		super(client, "ready");
	}

	public async run() {
		this.client.logger.success("client", `Logged in as ${this.client.user?.tag} successfully`);

		// @ts-ignore
		this.client.guilds.cache.get(process.env.GUILD_ID)?.commands.set(
			this.client.slashcommands.map(cmd => cmd.config),
		);
	}
};