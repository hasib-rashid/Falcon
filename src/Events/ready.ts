import BaseEvent from "../base/BaseEvent";
import Falcon from "../base/Client";

export default class ReadyEvent extends BaseEvent {
	constructor(client: Falcon) {
		super(client, "ready");
	}

	public async run() {
		this.client.logger.success("client", `Logged in as ${this.client.user?.tag} successfully`);

		const Activities = [
			`Serving .help | 🎉`,
			`In ${this.client.guilds.cache.size} Servers!| 🎉`,
			`Serving ${this.client.users.cache.size} users! | 🎉`,
		]

		setInterval(async () => {
			const randomIndex = Math.floor(Math.random() * (Activities.length - 1) + 1);
			const newActivity = Activities[randomIndex];

			await this.client.user?.setActivity(newActivity, { type: "WATCHING" });
		}, 10000);

		this.client.guilds.cache.map((ev) => {
			// @ts-ignore
			this.client.guilds.cache.get(ev.id).commands.set(
				this.client.slashcommands.map(cmd => cmd.config),
			);
		})
	}
};