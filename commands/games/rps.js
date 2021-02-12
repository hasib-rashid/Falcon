module.exports = {
    name: "rps",
    description: "Plays a game of Rock Paper and Scissors",
    usage: "rps",
    aliases: ["rock-paper-scissors"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false,
};

module.exports.execute = async (bot, message, args, data) => {
    const options = [
        "rock :shell: ",
        "paper :newspaper2:",
        "scissors :scissors: ",
    ];
    const option = options[Math.floor(Math.random() * options.length)];
    message.channel.send(`You got ${option}`);
};
