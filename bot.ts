import discordButtons from "discord-buttons";
import { config } from "dotenv";
config();
import Client from "./classes/client";
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

discordButtons(client)