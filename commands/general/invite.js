module.exports = {
    name: "invite",
    description: "Invite People with only 1 command",
    category: "invite",
    botPermission: [],
    authorPermission: [],
    ownerOnly: false,
    run: async (message) => {
        channel.createInvite({ unique: true }).then((invite) => {
            message.channel.send(
                "**This Server's Invite Link** https://discord.gg/" +
                    invite.code
            );
        });
    },
};
