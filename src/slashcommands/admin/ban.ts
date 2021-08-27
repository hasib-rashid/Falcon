import { CommandInteraction, GuildMember, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed } from "discord.js";
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
                },
                {
                    name: "reason",
                    description: "The reason why the user is getting banned",
                    type: "STRING",
                    required: false
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
            const banReason = interaction.options.get("reason")

            const confirmEmbed = new MessageEmbed()
                .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
                .setTitle("Banning A User")
                .setColor("#ed3737")
                .setDescription(`**Are you sure you want to ban  ${targetUser} for \`${banReason.value}\`**`)
                .setFooter(this.client.user?.username, this.client.user?.displayAvatarURL())


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

            const banYesFilter = (i: MessageComponentInteraction) => i.customId === 'ban-yes'
            const banYesCollector = interaction.channel.createMessageComponentCollector({ filter: banYesFilter, time: 30000 });

            const banNoFilter = (i: MessageComponentInteraction) => i.customId === 'ban-no'
            const banNoCollector = interaction.channel.createMessageComponentCollector({ filter: banNoFilter, time: 30000 });

            interaction.editReply({ embeds: [confirmEmbed], components: [row] })

            banYesCollector.on('collect', async (i: MessageComponentInteraction) => {
                if (i.customId === 'ban-yes') {
                    if (i.user.id !== interaction.user.id) {
                        i.reply({ content: "**You did not send this command. So you cannot use it unless you send the command yourself**", ephemeral: true })
                    } else {
                        interaction.editReply({ content: `**Successfully Banned ${targetUser} for \`${banReason.value}\`**`, embeds: [], components: [] })

                        const banEmbed = new MessageEmbed()
                            .setAuthor(interaction.user.username, interaction.user.displayAvatarURL())
                            .setTitle(`Banned from ${interaction.guild?.name}`)
                            .setDescription(`**${interaction.user} Has Banned you from ${interaction.guild?.name} for \`${banReason.value}\`. Please contact him if you want to get unbanned.**`)
                            .setColor("#ed3737")
                            .setFooter(this.client.user?.username, this.client.user?.displayAvatarURL())

                        await targetUser?.send({ embeds: [banEmbed] }).catch((err) => { i.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })
                    }
                }
            });

            banNoCollector.on('collect', async (i: MessageComponentInteraction) => {
                if (i.customId === 'ban-no') {
                    if (i.user.id !== interaction.user.id) {
                        i.reply({ content: "**You did not send this command. So you cannot use it unless you send the command yourself**", ephemeral: true })
                    } else {
                        interaction.editReply({ content: "**Cancelled the action**", components: [] })
                    }
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
};