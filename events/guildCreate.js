const { Guild } = require("discord.js");

module.exports.run = async (guild) => {
    prefix.defaultPrefix(guild, "!");
    guild.roles.create({ name: "Muted", color: "#313131" });
    console.log("Joined a new server: " + guild.name);
    console.log("It has " + guild.memberCount + " members ;)");
};
