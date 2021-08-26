import { CommandInteraction, MessageEmbed } from "discord.js";
import BaseSlashCommand from "../../base/BaseSlashCommand";
import Falcon from "../../base/Client";

export default class PingCommand extends BaseSlashCommand {
    constructor(client: Falcon) {
        super(client, {
            name: "comingsoon",
            description: "Events are Coming Soon.....",
        });
    }

    public async run(interaction: CommandInteraction) {
        try {
            interaction.editReply("**Event Commands are coming soon. Stay Tuned ;)**")
        } catch (err) {
            console.error(err);
        }
    }
};