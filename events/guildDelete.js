module.exports.run = async (guild) => {
    prefix.deletePrefix(guild);
    console.log("Left the server:" + guild.name);
};
