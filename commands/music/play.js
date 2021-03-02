const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const DisTube = require("distube");
const { formatNumber } = require("../../util/Util");

const client = new commando.Client();

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
let stateswitch = false;
let emojis = ["✅", "☑️", "👌", "👍", "❤️", "🎶", "🎵"];
const filters = [
    "mcompand",
    "gate",
    "haas",
    "pulsator",
    "surrounding",
    "clear",
    "8d",
    "bassboost",
    "echo",
    "karaoke",
    "nightcore",
    "vaporwave",
    "flanger",
    "subboost",
    "phaser",
    "tremolo",
    "vibrato",
    "reverse",
    "purebass",
    "treble",
];

module.exports = class PlayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "play",
            aliases: [],
            group: "music",
            memberName: "play",
            description: "Play a music here!",
            details: oneLine`
                Search a music here!
            `,
            examples: ["!Search <song_name>"],
            args: [
                {
                    key: "query",
                    type: "string",
                    prompt: "Please specify the song you wanna play",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { query }) {
        try {
            message.channel.send(
                "<:YouTube:801465200775135282> **Searching** :mag_right: `" +
                    `${query}` +
                    "`"
            );

            distube.play(message, query);
        } catch (err) {
            console.error(err);
        }
    }
};

const status = (queue) =>
    `Volume: \`${queue.volume}%\` | Filter: \`${
        queue.filter || "Off"
    }\` | Loop: \`${
        queue.repeatMode
            ? queue.repeatMode == 2
                ? "All Queue"
                : "This Song"
            : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

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
    .on("addSong", async (message, queue, song) => {
        const voiceChannelName = message.member.voice.channel.name;
        try {
            let embed1 = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setTitle(`Added to Queue!`)
                .setDescription(
                    `<:YouTube:801465200775135282> **[${song.name}](${song.url})** \n\n **Requested By: <@${message.author.id}>**\n\n`
                )
                .addFields(
                    {
                        name: "Duration",
                        value: song.formattedDuration,
                        inline: true,
                    },
                    {
                        name: "Will be played in:",
                        value: voiceChannelName,
                        inline: true,
                    }
                )
                .setThumbnail(song.thumbnail);

            message.channel.send(embed1);
        } catch (err) {
            console.error(err);
        }
    })
    .on("playList", (message, queue, playlist, song) =>
        message.channel.send(
            `Play \`${playlist.name}\` playlist (${
                playlist.songs.length
            } songs).\nRequested by: ${song.user}\nNow playing \`${
                song.name
            }\` - \`${song.formattedDuration}\`\n${status(queue)}`
        )
    )
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(
            `**Choose an option from below**\n${result
                .map(
                    (song) =>
                        `**${++i}**. ${song.name} - \`${
                            song.formattedDuration
                        }\``
                )
                .join(
                    "\n"
                )}\n*Enter anything else or wait 60 seconds to cancel*`
        );
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e);
        message.channel.send("An error encountered: " + e);
    });
