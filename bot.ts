import discordButtons from "discord-buttons";
import { Message, MessageEmbed } from "discord.js";
import Queue from "distube/typings/Queue";
import Song from "distube/typings/Song";
import { config } from "dotenv";
config();
import Client from "./classes/client";
import { formatNumber } from "./util/Util";
const DisTube = require("distube");

const client = new Client({
    token: process.env.TOKEN,
    ownerID: "548038495617417226",
    commandDir: `${__dirname}/commands`,
    eventDir: `${__dirname}/events`,
    prefix: ".",
    emotes: {
        success: "<a:checkmark:840147155112165406>",
        error: "<a:error:840147176360378388>",
        loading: "<a:loading:840147214193917963>",
        bot: "<:bot:841733069458899015>",
        chat: "<:chat:841735309258653708>",
    },
});

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

client.distube = distube;

distube
    .on("playSong", async (message: Message, queue: Queue, song: any) => {
        const voiceChannelName = message.member?.voice.channel?.name;
        try {
            let embed1 = new MessageEmbed()

                .setColor("GREEN")
                .setAuthor(
                    message.author.username,
                    message.author.displayAvatarURL()
                )
                .setTitle(
                    `Playing in \`${voiceChannelName}\`! `
                )
                .setDescription(
                    `<:youtube:864559346137956402> **[${song.name}](${song.url})** \n\n **Requested By: <@${message.author.id}>**\n\n`
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
    .on("addSong", (message: Message, queue: Queue, song: any) => {
        const embed = new MessageEmbed()
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
    .on("searchCancel", (message: Message) =>
        message.channel.send(`**Searching canceled**`)
    )
    .on("error", (message: Message, e: any) => {
        console.error(e);
        message.channel.send("An error encountered: " + e);
    })
    .on("initQueue", (queue: Queue) => {
        queue.autoplay = false;
        queue.volume = 50;
    })
    .on("empty", (message: Message) => {
        distube.stop(message);
        message.channel.send(
            "**Channel is Empty. Cleared the queue and left the voice channel!**"
        );
    })
    .on("noRelated", (message: Message) =>
        message.channel.send(
            "**Can't find related video to play. Stop playing music.**"
        )
    )
    .on("finish", (message: Message) =>
        message.channel.send("**No more song in queue to play. Add More!**")
    );


discordButtons(client)