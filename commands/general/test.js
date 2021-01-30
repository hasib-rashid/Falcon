module.exports = {
    name: "test",
    description: "Command Description",
    category: "test",
    botPermission: [],
    authorPermission: [],
    ownerOnly: false,
    run: async (client, message, args) => {
        message.channel.send("Test command working.");
    },
};
