import { CommandInteraction, MessageEmbed } from "discord.js";
import BaseSlashCommand from "../../base/BaseSlashCommand";
import Falcon from "../../base/Client";

export default class PingCommand extends BaseSlashCommand {
    constructor(client: Falcon) {
        super(client, {
            name: "uptime",
            description: "Check the Uptime of Falcon",
        });
    }

    public async run(interaction: CommandInteraction) {
        try {
            let totalSeconds = this.client.uptime / 1000;
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds / 60;
            interaction.editReply(
                `:low_brightness: **Uptime:** ${days} days, ${hours} hours and ${minutes} minutes!`
            );
        } catch (err) {
            console.error(err);
        }
    }
};