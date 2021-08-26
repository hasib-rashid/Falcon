import { CommandInteraction, Interaction, Message } from "discord.js";
import BaseEvent from "../base/BaseEvent";
import CodeFictionist from "../base/Client";

export default class MessageCreateEvent extends BaseEvent {
    constructor(client: CodeFictionist) {
        super(client, "messageCreate");
    }

    public async run(message: Message) {
    }

    private async __handleCommand(message: Message) {
        try {
        }
        catch (err) {
            this.client.logger.error("client/commands", (err as Error).message, (err as Error).stack);
        }
    }
}