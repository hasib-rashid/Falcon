module.exports = {
    name: "test",
    description: "Command Description",
    category: "test",
    botPermission: [],
    authorPermission: [],
    ownerOnly: false,
    run: async (message) => {
        const options = [
            "rock :shell: ",
            "paper :newspaper2:",
            "scissors :scissors: ",
        ];
        const option = options[Math.floor(Math.random() * options.length)];
        message.channel.send(`You got ${option}`);
    },
};
