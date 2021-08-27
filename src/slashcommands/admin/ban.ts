import { CommandInteraction, GuildMember, MessageActionRow, MessageButton } from "discord.js";
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

            const targetUser = interaction.guild.members.cache.get(interaction.options.get("user").user.id)

            const confirmButton = new MessageButton()
                .setCustomId("ban-yes")
                .setLabel("Yes")
                .setStyle("SUCCESS")

            const denyButton = new MessageButton()
                .setCustomId("ban-no")
                .setLabel("No")
                .setStyle("DANGER")

            const row = new MessageActionRow()
                .addComponents(confirmButton, denyButton)

            interaction.editReply({ content: "U sure Dude?", components: [row] })
        } catch (err) {
            console.error(err);
        }
    }
};