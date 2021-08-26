import { CommandInteraction, MessageEmbed } from "discord.js";
import BaseSlashCommand from "../../base/BaseSlashCommand";
import Falcon from "../../base/Client";

export default class PingCommand extends BaseSlashCommand {
    constructor(client: Falcon) {
        super(client, {
            name: "invite",
            description: "Invite Falcon",
        });
    }

    public async run(interaction: CommandInteraction) {
        const embed = new MessageEmbed()
            .setAuthor(
                interaction.user.username,
                interaction.user.displayAvatarURL()
            )
            .setColor("BLUE")
            .setTitle("Invite CodeVert!")
            .setTimestamp()
            .setDescription(
                "[Support Server](https://discord.gg/X2dDeENmJh)\r[Invite Me](https://discord.com/api/oauth2/authorize?client_id=799543154692718602&permissions=8&scope=bot)"
            );


        interaction.editReply({ embeds: [embed] });
    }
};