module.exports = {
    name: "uptime",
    description: "See the Bots Uptime",
    category: "general",
    botPermission: [],
    authorPermission: [],
    ownerOnly: false,
    run: async (client, message) => {
        let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds / 60;
        message.channel.send(
            `:low_brightness: **Uptime:** ${days} days, ${hours} hours and ${minutes} minutes!`
        );
    },
};
