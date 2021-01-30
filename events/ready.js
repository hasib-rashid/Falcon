module.exports.run = (client, message) => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`${client.channels.cache.size} Channels | !help`, {
        type: "WATCHING",
    });
};
