module.exports = async (bot) => {
    try {
        console.log(`Logged in as ${bot.user.tag}!`);
        bot.user.setActivity(`${bot.channels.cache.size} Channels | !help`, {
            type: "WATCHING",
        });
    } catch (err) {
        console.error(err);
    }
};
