require("dotenv").config();

const { CommandoClient } = require("discord.js-commando");
const Discord = require("discord.js");
const DisTube = require("distube");
const canvas = require("discord-canvas");
const moment = require("moment");
const path = require("path");
const { ReactionRoleManager } = require("discord.js-collector");
let ticketeasy = require("ticket.easy");
const ticket = new ticketeasy();
const { formatNumber } = require("./util/Util");

const MongoClient = require("mongodb").MongoClient;
const MongoDBProvider = require("commando-provider-mongo").MongoDBProvider;
const mongo = require("./mongo.js");
const mongoose = require("mongoose");

const { GiveawaysManager } = require("discord-giveaways");

mongoose.connect(process.env.MONGO_PATH, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

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

// MongoDB Provider
client
    .setProvider(
        MongoClient.connect(process.env.MONGO_PATH).then(
            (client) => new MongoDBProvider(client, "test-db-codevert")
        )
    )
    .catch(console.error);

// Giveaway Manager
const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        embedColor: "RANDOM",
        reaction: "🎉",
        embedColorEnd: "#1f75ff",
    },
});

// Distube Manager
const distube = new DisTube(client, {
    youtubeCookie: "",
    searchSongs: false,
    emitNewSongOnly: false,
    highWaterMark: 1 << 25,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    customFilters: {
        clear: "dynaudnorm=f=200",
        bassboost: "bass=g=20,dynaudnorm=f=200",
        "8d": "apulsator=hz=0.08",
        vaporwave: "aresample=48000,asetrate=48000*0.8",
        nightcore: "aresample=48000,asetrate=48000*1.25",
        phaser: "aphaser=in_gain=0.4",
        purebass: "bass=g=20,dynaudnorm=f=200,asubboost",
        tremolo: "tremolo",
        vibrato: "vibrato=f=6.5",
        reverse: "areverse",
        treble: "treble=g=5",
        surrounding: "surround",
        pulsator: "apulsator=hz=1",
        subboost: "asubboost",
        karaoke: "stereotools=mlev=0.03",
        flanger: "flanger",
        gate: "agate",
        haas: "haas",
        mcompand: "mcompand",
    },
});

// Reaction Role Manager
const reactionRoleManager = new ReactionRoleManager(client, {
    mongoDbLink: process.env.MONGO_PATH,
});

client.giveaways = manager;

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ["general", ":smiley: General"],
        ["games", ":video_game: Games"],
        ["moderation", "<:ban_hammer:809356434885967882> Moderators"],
        ["music", ":musical_note: Music"],
        ["events", ":checkered_flag: Events"],
        ["notify", ":speech_left: Notify devs about Bugs and Features"],
        ["nsfw", ":underage: NSFW"],
        ["misc", ":wrench: MISC"],
        ["fun", ":rofl: Fun"],
        ["search", ":mag: Search"],
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

client.on("ready", async () => {
    await mongo().then((mongoose) => {
        console.log("Connected to MongoDB Database.");
    });
});

client.on("message", async (message) => {
    const client = message.client;

    const args = message.content.slice(1).trim().split(/ +/g); //arguments of the content
    const command = args.shift();

    // Example
    // >createReactionRole @role :emoji: MessageId
    if (command === "createRR") {
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
    }

    if (command === "!deleteRR") {
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

    //! BullShit Bugs
    if (message.content.includes("iplay")) return;
    if (message.content.includes("i play")) return;
    if (message.content.includes("i  play")) return;
    if (message.content.includes("i   play")) return;
    if (message.content.includes("i    play")) return;
    if (message.content.includes("i     play")) return;

    if (command === "play") {
        if (!args)
            return message.channel.send("Please sepcify which song do i play!");

        message.channel.send(
            "<:YouTube:801465200775135282> **Searching** :mag_right: `" +
                `${args}` +
                "`"
        );

        distube.play(message, args.join(" "));
    }

    if (command === "search") {
        embedbuilder(client, message, "GREEN", "Searching!", args.join(" "));

        let result = await distube.search(args.join(" "));

        let searchresult = "";

        for (let i = 0; i <= result.length; i++) {
            try {
                searchresult += await `**${i + 1}**. ${result[i].name} - \`${
                    result[i].formattedDuration
                }\`\n`;
            } catch {
                searchresult += await " ";
            }
        }
        let searchembed = await embedbuilder(
            client,
            message,
            "#fffff0",
            "Current Queue!",
            searchresult
        );

        let userinput;

        await searchembed.channel
            .awaitMessages((m) => m.author.id == message.author.id, {
                max: 1,
                time: 60000,
                errors: ["time"],
            })
            .then((collected) => {
                userinput = collected.first().content;
                if (isNaN(userinput)) {
                    embedbuilder(
                        client,
                        message,
                        "RED",
                        "Not a right number!",
                        "so i use number 1!"
                    );
                    userinput = 1;
                }
                if (Number(userinput) < 0 && Number(userinput) >= 15) {
                    embedbuilder(
                        client,
                        message,
                        "RED",
                        "Not a right number!",
                        "so i use number 1!"
                    );
                    userinput = 1;
                }
                searchembed.delete({ timeout: Number(client.ws.ping) });
            })
            .catch(() => {
                console.log(console.error);
                userinput = 404;
            });
        if (userinput === 404) {
            return embedbuilder(
                client,
                message,
                "RED",
                "Something went wrong!"
            );
        }

        return distube.play(message, result[userinput - 1].url);
    }

    if (command === "skip") {
        message.channel.send(":white_check_mark: Song Skipped!");

        return distube.skip(message);
    }

    if (command === "loop" || command === "repeat") {
        if (0 <= Number(args[0]) && Number(args[0]) <= 2) {
            await distube.setRepeatMode(message, parseInt(args[0]));
            await embedbuilder(
                client,
                message,
                "GREEN",
                "Repeat mode set to:!",
                `${args[0]
                    .replace("0", "OFF")
                    .replace("1", "Repeat song")
                    .replace("2", "Repeat Queue")}`
            );
            return;
        } else {
            return embedbuilder(
                client,
                message,
                "RED",
                "ERROR",
                `Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`
            );
        }
    }

    if (command === "seek") {
        if (!args) {
            message.channel.send(
                ":no_entry: Please specify where will I move the song to in seconds?"
            );
        }
        await embedbuilder(
            client,
            message,
            "GREEN",
            "Seeked!",
            `Seeked the song to \`${args[0]} seconds\``
        );
        await distube.seek(message, Number(args[0] * 1000));
        await delay(5000);
        await message.channel.bulkDelete(2);
        return;
    }

    function embedbuilder(
        client,
        message,
        color,
        title,
        description,
        thumbnail
    ) {
        try {
            let embed = new Discord.MessageEmbed()
                .setColor(color)
                .setAuthor(
                    message.author.tag,
                    message.member.user.displayAvatarURL({ dynamic: true }),
                    "https://harmonymusic.tk"
                )
                .setFooter(
                    client.user.username,
                    client.user.displayAvatarURL()
                );
            if (title) embed.setTitle(title);
            if (description) embed.setDescription(description);
            if (thumbnail) embed.setThumbnail(thumbnail);
            return message.channel.send(embed);
        } catch (error) {
            console.error;
        }
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
    const channel = member.guild.channels.cache.find("818370414542716998");

    if (!channel) return;

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
    try {
        const channel = member.guild.channels.cache.find("818370414542716998");

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
    } catch (err) {
        console.error(err);
    }
});

distube
    .on("playSong", async (message, queue, song) => {
        const voiceChannelName = message.member.voice.channel.name;
        try {
            let embed1 = new Discord.MessageEmbed()

                .setColor("GREEN")
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setTitle(
                    `<:Disc:816225417982771201> Playing in \`${voiceChannelName}\`! `
                )
                .setDescription(
                    `<:YouTube:801465200775135282> **[${song.name}](${song.url})** \n\n **Requested By: <@${message.author.id}>**\n\n`
                )
                .addFields(
                    { name: "Views", value: formatNumber(song.views) },
                    {
                        name: "Likes :thumbsup:",
                        value: formatNumber(song.likes),
                        inline: true,
                    },
                    {
                        name: "DisLikes :thumbsdown:",
                        value: formatNumber(song.dislikes),
                        inline: true,
                    }
                )
                .setFooter(`Duration [${song.formattedDuration}]`)
                .setThumbnail(song.thumbnail);

            message.channel.send(embed1);
        } catch (err) {
            console.error(err);
        }
    })
    .on("addSong", (message, queue, song) => {
        const embed = new Discord.MessageEmbed()
            .setAuthor(
                message.author.username,
                message.author.displayAvatarURL()
            )
            .setTitle("Added a Song!")
            .setColor("GREEN")
            .setDescription(
                `Song: [\`${song.name}\`](${song.url})  -  \`${
                    song.formattedDuration
                }\` \n\nRequested by: ${song.user}\n\nEstimated Time: ${
                    queue.songs.length - 1
                } song(s) - \`${(
                    Math.floor(((queue.duration - song.duration) / 60) * 100) /
                    100
                )
                    .toString()
                    .replace(".", ":")}\`\nQueue duration: \`${
                    queue.formattedDuration
                }\``
            )
            .setThumbnail(song.thumbnail);

        message.channel.send(embed);
    })
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e);
        message.channel.send("An error encountered: " + e);
    });

client.login(process.env.TOKEN);
