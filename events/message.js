const { owners } = require("../config.json");

const { aPrefix } = require("discord_auto_prefix");
const prefix = new aPrefix();

module.exports.run = async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.content.split(" ").forEach((m) => {
            // if (is_url(m)) {
            //  message.delete().catch(err => {})
            // return message.channel.send("You are not allowed to send links :/")
            // } else if (badwords.find(x => x.toLowerCase() === m.toLowerCase())) {
            // message.delete().catch(err => {});
            // return message.channel.send(
            // "You are not allowed to use (**" + m + "**) word here"
            // YOU CAN IMPLEMENT YOUR OWN URL CHECK/BAD WORDS CHECK FUNCTIONS
        });
    }

    const PREFIX = await prefix.fetchPrefix(message);

    if (!message.content.startsWith(PREFIX)) return;

    if (!message.member)
        message.member = await message.guild.members.fetch(message);

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (!command) return;
    if (command.botPermission) {
        let neededPerms = [];

        command.botPermission.forEach((p) => {
            if (!message.guild.me.hasPermission(p))
                neededPerms.push("`" + p + "`");
        });

        if (neededPerms.length)
            return message.channel.send(
                `I need ${neededPerms.join(
                    ", "
                )} permission(s) to run this command!`
            );
    }
    if (command.authorPermission) {
        let neededPerms = [];

        command.authorPermission.forEach((p) => {
            if (!message.member.hasPermission(p))
                neededPerms.push("`" + p + "`");
        });

        if (neededPerms.length)
            return message.channel.send(
                `You need ${neededPerms.join(
                    ", "
                )} permission(s) to run this command!`
            );
    }

    if (command.ownerOnly) {
        if (!owners.includes(message.author.id))
            return message.channel.send(
                "This command can only be used by the bot owner."
            );
    }

    if (command) command.run(client, message, args);
};
