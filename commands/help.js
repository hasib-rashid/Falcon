const { MessageEmbed } = require("discord.js");

const { aPrefix } = require("discord_auto_prefix");
const prefix = new aPrefix();

module.exports = {
    id: "help",
    aliases: ["help"],
    channels: "any",
    exec: async (client) => {
        const PREFIX = await prefix.fetchPrefix(client.message);

        const helpEmbed = new MessageEmbed()
            .setTitle(`CodeVert commands list | prefix \`${PREFIX}\``)
            .addField(
                "**For Users**",
                "`hello` `ping` `uptime` `avatar` `invite` `wiki` `country`"
            )
            .addField(
                "**For Moderators**",
                "`kick` `ban` `mute` `unmute` `add` `remove` `purge` `giveaway`"
            )
            .addField("**Server Games**", "`rps`")
            .setImage(
                client.client.user.avatarURL({ dynamic: true, size: 256 })
            )
            .setColor("RANDOM");
        client.message.channel.send(helpEmbed);
    },
};
