import { ClientEvents } from "discord.js";
import Falcon from "./Client";

export default abstract class BaseEvent {
	public client: Falcon;
	public name: keyof ClientEvents;

	constructor(client: Falcon, name: keyof ClientEvents) {
		this.client = client;

		Object.defineProperty(this, "client", {
			enumerable: false,
			configurable: true,
			writable: true,
		});

		this.name = name;
	}

	// eslint-disable-next-line no-unused-vars
	abstract run(...args: any[]): Promise<any>
};