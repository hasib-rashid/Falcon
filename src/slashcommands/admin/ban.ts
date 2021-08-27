import { CommandInteraction, GuildMember } from "discord.js";
import BaseSlashCommand from "../../base/BaseSlashCommand";
import Falcon from "../../base/Client";

export default class PingCommand extends BaseSlashCommand {
    constructor(client: Falcon) {
        super(client, {
            name: "ban",
            description: "Ban Someone from the server",
            options: [
                {
                    name: "user",
                    description: "Specify the User to ban",
                    type: "USER",
                    required: true,
                }
            ]
        });
    }

    public async run(interaction: CommandInteraction) {
        try {
            if (!interaction.user) return;

            if (!(interaction.member as GuildMember).permissions.has("BAN_MEMBERS")) return interaction.editReply(
                "**You need `BAN_MEMBERS` permission to use this command**"
            );

            interaction.editReply(interaction.options.get("user").user.username)
        } catch (err) {
            console.error(err);
        }
    }
};