import { CommandInteraction, Message, MessageEmbed } from "discord.js";
import BaseSlashCommand from "../../base/BaseSlashCommand";
import Falcon from "../../base/Client";


export default class PingCommand extends BaseSlashCommand {
    constructor(client: Falcon) {
        super(client, {
            name: "youtube-together",
            description: "Watch Youtube in Discord with ur buddies :)",
        });
    }

    public async run(interaction: CommandInteraction) {
        if (interaction.guild.members.cache.get(interaction.user.id).voice.channel === null) {
            interaction.followUp("**You have to be in a Voice to start A Youtube Watching Session**")
        } else {
            this.client.discordTogether.createTogetherCode(interaction.guild.members.cache.get(interaction.user.id).voice.channel.id, 'doodlecrew').then(async invite => {
                return interaction.followUp(`${invite.code}`);
            });
        }
    }
};