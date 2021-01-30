const Discord = require("discord.js");

const config = require("../../config.json");

module.exports = {
    name: "help",
    description: "Helping People with the Bot",
    category: "general",
    botPermission: [],
    authorPermission: [],
    ownerOnly: false,
    run: async (client, message) => {
        const helpEmbed = new Discord.MessageEmbed()
            .setTitle(`CodeVert commands list | prefix \`${config.prefix}\``)
            .addField(
                "**For Users**",
                "`hello` `ping` `uptime` `avatar` `invite` `wiki` `country`"
            )
            .addField(
                "**For Moderators**",
                "`kick` `ban` `mute` `unmute` `add` `remove` `purge` `giveaway`"
            )
            .addField("**Server Games**", "`rps`")
            .setImage(client.user.avatarURL({ dynamic: true, size: 256 }))
            .setColor("RANDOM");
        message.channel.send(helpEmbed);
    },
};
