module.exports.run = (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`${client.channels.cache.size} Channels | !help`, {
        type: "WATCHING",
    });
};
