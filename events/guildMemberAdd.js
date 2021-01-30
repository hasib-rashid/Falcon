module.exports.run = ({ member, guild }) => {
    const channel = member.guild.channels.find(
        (channel) => channel.name === "welcome"
    );

    const memberCount = guild.members.filter((member) => !member.user.client)
        .size;

    if (!channel) return;

    const join_embed = new Discord.MessageEmbed()
        .setTitle(`A New Programmer Just Arrived!`)
        .setAuthor(`Everybody Welcome ${member}. Hope you have a great Stay`)
        .setDescription(
            `Welcome!

            Hey there, welcome to ${guild.name}, the discord server!
            
            We're a  friendly community focused around the programming languages, open to those who wish to learn the languages or improve their skills, as well as those looking to help others.
            
            We organise regular community events and have a dedicated staff of talented developers available to assist around the clock. Whether you're looking to learn the languages or working on a complex project, we've got someone who can help you if you get stuck.
    
    
            Find us at
            GitHub: https://github.com/Hall-of-Programmers`
        )
        .setColor("RANDOM");

    channel.send(join_embed);
    console.log(
        `${member.tag} just joined ${guild.name} which has ${memberCount}`
    );
};
