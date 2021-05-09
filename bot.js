require("dotenv").config();

const { CommandoClient } = require("discord.js-commando");
const Discord = require("discord.js");
const DisTube = require("distube");
const canvas = require("discord-canvas");
const path = require("path");
const { ReactionRoleManager } = require("discord.js-collector");
const { formatNumber } = require("./util/Util");
const db = require("./database")

//* Models
const GuildUser = require("./models/GuildUser")

const { GiveawaysManager } = require("discord-giveaways");

const client = new CommandoClient({
    commandPrefix: ".",
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

// Giveaway Manager
const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 40000,
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

//* Client Managers
client.giveaways = manager;
client.distube = distube;
client.reactionRole = reactionRoleManager;

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
        ["owner", ":crown: Owner"],
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

    db.authenticate().then(() => {
        console.log("Connected to Database.")

        GuildUser.init(db)
        GuildUser.sync()
    }).catch(err => {
        console.error(err)
    })
});

// Triggered when the bot doesn't have permissions to manage this role.
reactionRoleManager.on(
    "missingPermissions",
    (action, member, roles, reactionRole) => {
        console.log(
            `Some roles cannot be ${action === 1 ? "given" : "taken"
            } to member \`${member.displayName
            }\`, because i don't have permissions to manage these roles: ${roles
                .map((role) => `\`${role.name}\``)
                .join(",")}`
        );
    }
);

function generateXp(min, max) {
    return Math.ceil(Math.random() * (max - min + 1));
}

client.on("message", (message) => {
    if (message.author.bot) return;

    GuildUser.findOne({ where: { userID: message.author.id, guildID: message.guild.id } }).then((response, err) => {
        if (err) throw err;

        if (response === null) {
            GuildUser.create({ userID: message.author.id, guildID: message.guild.id, rank: generateXp(10, 20) })
        } else {
            const newXP = response.dataValues.rank + generateXp(10, 20)
            GuildUser.update({ rank: newXP }, { where: { userID: message.author.id, guildID: message.guild.id } })
        }
    })
})

client.on("guildMemberAdd", async (member) => {
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

    const setWelcomeSchema = require("./models/welcomeChannelSchema.js");

    const welcomeSche = await setWelcomeSchema.findOne({
        guild: member.guild.id,
    });

    if (welcome) {
        const channel = welcomeSche.channel;

        member.guild.channels.cache
            .find((c) => c.id === channel)
            .send(attachment);
    } else return;
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
                `Song: [\`${song.name}\`](${song.url})  -  \`${song.formattedDuration
                }\` \n\nRequested by: ${song.user}\n\nEstimated Time: ${queue.songs.length - 1
                } song(s) - \`${(
                    Math.floor(((queue.duration - song.duration) / 60) * 100) /
                    100
                )
                    .toString()
                    .replace(".", ":")}\`\nQueue duration: \`${queue.formattedDuration
                }\``
            )
            .setThumbnail(song.thumbnail);

        message.channel.send(embed);
    })
    .on("searchCancel", (message) =>
        message.channel.send(`**Searching canceled**`)
    )
    .on("error", (message, e) => {
        console.error(e);
        message.channel.send("An error encountered: " + e);
    })
    .on("initQueue", (queue) => {
        queue.autoplay = false;
        queue.volume = 50;
    })
    .on("empty", (message) => {
        distube.stop(message);
        message.channel.send(
            "**Channel is Empty. Cleared the queue and left the voice channel!**"
        );
    })
    .on("noRelated", (message) =>
        message.channel.send(
            "**Can't find related video to play. Stop playing music.**"
        )
    )
    .on("finish", (message) =>
        message.channel.send("**No more song in queue to play. Add More!**")
    );

client.login(process.env.TOKEN);
