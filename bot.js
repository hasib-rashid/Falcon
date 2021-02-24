require("dotenv").config();

const { CommandoClient } = require("discord.js-commando");
const Discord = require("discord.js");
const canvas = require("discord-canvas");
const path = require("path");
const { ReactionRoleManager } = require("discord.js-collector");
let ticketeasy = require("ticket.easy");
const ticket = new ticketeasy();

const client = new CommandoClient({
    commandPrefix: process.env.PREFIX,
    owner: "548038495617417226",
    autoReconnect: true,
    partials: [
        "MESSAGE",
        "CHANNEL",
        "GUILD_MEMBER",
        "REACTION",
        "MESSAGE",
        "USER",
    ],
});

const reactionRoleManager = new ReactionRoleManager(client, {
    mongoDbLink: process.env.MONGO_PATH, // See here to see how setup mongoose: https://github.com/IDjinn/Discord.js-Collector/blob/master/examples/reaction-role-manager/Note.md
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["general", "General Command Group"],
        ["games", "Games from CodeVert"],
        ["moderation", "Moderators group"],
        ["music", "Music Commands Group"],
        ["events", "Events from CodeVert"],
        ["notify", "Notify devs about Bugs and Features"],
        ["nsfw", "NSFW Content Group"],
        ["misc", "Miscellanious Commands"],
        ["fun", "Fun Commands from CodeVert"],
        ["search", "Search anything from CodeVert"],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        help: false,
        ping: false,
        prefix: true,
        commandState: true,
        unknownCommand: false,
    })
    .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
    console.log(`[READY] Logged in as ${client.user.tag}!`);
});

// Triggered when the bot doesn't have permissions to manage this role.
reactionRoleManager.on(
    "missingPermissions",
    (action, member, roles, reactionRole) => {
        console.log(
            `Some roles cannot be ${
                action === 1 ? "given" : "taken"
            } to member \`${
                member.displayName
            }\`, because i don't have permissions to manage these roles: ${roles
                .map((role) => `\`${role.name}\``)
                .join(",")}`
        );
    }
);

client.on("message", async (message) => {
    const client = message.client;
    const args = message.content.split(" ").slice(1);
    // Example
    // >createReactionRole @role :emoji: MessageId
    if (message.content.startsWith("!createRR")) {
        const role = message.mentions.roles.first();
        if (!role)
            return message
                .reply("You need mention a role")
                .then((m) => m.delete({ timeout: 1000 }));

        const emoji = args[1];
        if (!emoji)
            return message
                .reply("You need use a valid emoji.")
                .then((m) => m.delete({ timeout: 1000 }));

        const msg = await message.channel.messages.fetch(args[2] || message.id);
        if (!role)
            return message
                .reply("Message not found! Wtf...")
                .then((m) => m.delete({ timeout: 1000 }));

        reactionRoleManager.createReactionRole({
            message: msg,
            roles: [role],
            emoji,
            type: 1,
        });
        /**
         * Reaction Role Type
         * NORMAL [1] - This role works like basic reaction role.
         * TOGGLE [2] - You can win only one role of all toggle roles in this message (like colors system)
         * JUST_WIN [3] - This role you'll only win, not lose.
         * JUST_LOSE [4] - This role you'll only lose, not win.
         * REVERSED [5] - This is reversed role. When react, you'll lose it, when you take off reaction you'll win it.
         */

        message.reply("Done").then((m) => m.delete({ timeout: 500 }));
    } else if (message.content.startsWith("!deleteRR")) {
        const emoji = args[0];
        if (!emoji)
            return message
                .reply("You need use a valid emoji.")
                .then((m) => m.delete({ timeout: 1000 }));

        const msg = await message.channel.messages.fetch(args[1]);
        if (!msg)
            return message
                .reply("Message not found! Wtf...")
                .then((m) => m.delete({ timeout: 1000 }));

        await reactionRoleManager.deleteReactionRole({ message: msg, emoji });
    }
});

client.on("messageReactionAdd", async (reaction, user, msg) => {
    if (user.partial) await user.fetch();
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();
    if (user.bot) return;

    if (
        reaction.message.id == "812589352454455336" &&
        reaction.emoji.name == "🎫"
    ) {
        reaction.users.remove(user);

        const supportRoleID = "812572216960483338";
        ticket.createTicket({
            message: reaction.message, //The way you defined message in the message event
            supportRole: supportRoleID, //Support role, can be an ID and the role name
            ticketMessage: `<@${user.id}> created a ticket. Please wait for the <@${supportRoleID}> to respond. Response will be there within 12 hours.`, //The message it will send in the ticket || Optional
            ticketTopic: user.tag, //The channel topic || Optional
            ticketParent: "812591005260840990", //Must be a category, can be an ID and a name || Optional
            ticketName: `ticket-${user.id}`, //This will be the ticket name || Optional
        });
    }
});

client.on("guildMemberAdd", async (member) => {
    const channel = member.guild.channels.cache.find(
        (ch) => ch.name === "joins-and-leaves"
    );
    const welcome = new canvas.Welcome();
    const image = await welcome
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(
            member.user.displayAvatarURL({
                format: "png",
                dynamic: false,
                size: 4096,
            })
        )
        .setColor("title", "#FFFFFF")
        .setColor("title-border", "#000")
        .setColor("avatar", "#000000")
        .setColor("border", "#000")
        .setColor("username-box", "#000")
        .setColor("username", "#FFFFFF")
        .setColor("hashtag", "#FFFFFF")
        .setColor("discriminator", "#FFFFFF")
        .setColor("discriminator-box", "#000")
        .setColor("message", "#FFFFFF")
        .setColor("message-box", "#000")
        .setColor("member-count", "#FFFFFF")
        .setColor("border", "#000000")
        .setBackground("https://wallpaperaccess.com//full/19811.jpg")
        .setText("title", "WELCOME")
        .setText("message", member.guild.name)
        .setText("member-count", `-${member.guild.memberCount} Member!`)
        .toAttachment();
    let attachment = new Discord.MessageAttachment(
        image.toBuffer(),
        "welcome.png"
    );
    channel.send(attachment);
});

client.on("guildMemberRemove", async (member) => {
    const channel = member.guild.channels.cache.find(
        (ch) => ch.name === "joins-and-leaves"
    );
    const welcome = new canvas.Goodbye();
    const image = await welcome
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(
            member.user.displayAvatarURL({
                format: "png",
                dynamic: false,
                size: 4096,
            })
        )
        .setColor("title", "#FFFFFF")
        .setColor("title-border", "#000")
        .setColor("avatar", "#000000")
        .setColor("border", "#000")
        .setColor("username-box", "#000")
        .setColor("username", "#FFFFFF")
        .setColor("hashtag", "#FFFFFF")
        .setColor("discriminator", "#FFFFFF")
        .setColor("discriminator-box", "#000")
        .setColor("message", "#FFFFFF")
        .setColor("message-box", "#000")
        .setColor("member-count", "#FFFFFF")
        .setColor("border", "#000000")
        .setBackground("https://wallpaperaccess.com//full/19811.jpg")
        .setText("title", "GOODBYE")
        .setText("message", member.guild.name)
        .toAttachment();
    let attachment = new Discord.MessageAttachment(
        image.toBuffer(),
        "goodbye.png"
    );
    channel.send(attachment);
});

client.on("error", console.error);

client.login(process.env.TOKEN);
