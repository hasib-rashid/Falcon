module.exports.run = ({ member, guild }) => {
    const channel = member.guild.channels.find(
        (channel) => channel.name === "welcome"
    );

    var memberCount = guild.members.filter((member) => !member.user.client)
        .size;

    if (!channel) return;

    const left_embed = new Discord.MessageEmbed()
        .setTitle(`A Programmer Left the Server ; (`)
        .setAuthor(
            `Everybody, ${member} just left the server.... Hope he comes back or had a nice journey together....`
        )
        .setColor("RANDOM");

    channel.send(left_embed);
    console.log(
        `${member.tag} just joined ${guild.name} which has ${memberCount}`
    );
};
