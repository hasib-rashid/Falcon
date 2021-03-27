function embedbuilder(client, message, color, title, description, thumbnail) {
    try {
        let embed = new Discord.MessageEmbed()
            .setColor(color)
            .setAuthor(
                message.author.tag,
                message.member.user.displayAvatarURL({ dynamic: true }),
                "https://harmonymusic.tk"
            )
            .setFooter(client.user.username, client.user.displayAvatarURL());
        if (title) embed.setTitle(title);
        if (description) embed.setDescription(description);
        if (thumbnail) embed.setThumbnail(thumbnail);
        return message.channel.send(embed);
    } catch (error) {
        console.error;
    }
}
