const { MessageEmbed } = require("discord.js");

module.exports = {
    id: "avatar",
    aliases: ["avatar", "av"],
    channels: "any",
    exec: async (client) => {
        const member = client.message.mentions.members.first();
        if (!member) {
            const avatar_embed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`**Avatar**`)
                .setTitle(`${client.message.author.username}'s Avatar`)
                .setImage(
                    client.message.author.avatarURL({
                        dynamic: true,
                        size: 256,
                    })
                );
            client.message.channel.send(avatar_embed);
        }

        if (member) {
            {
                const other_avatar_embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`**Avatar**`)
                    .setTitle(`${member.user.tag}'s Avatar`)
                    .setImage(
                        member.user.avatarURL({ dynamic: true, size: 256 })
                    );
                client.message.channel.send(other_avatar_embed);
            }
        }
    },
};
