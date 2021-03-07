const Discord = require("discord.js");
const commando = require("discord.js-commando");

const client = new Discord.Client();

const oneLine = require("common-tags").oneLine;
const DisTube = require("distube");

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

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "loop",
            aliases: [],
            group: "music",
            memberName: "loop",
            description: "Loop a music of your choice however you want!",
            details: oneLine`
                Loop a music of your choice however you want!
            `,
            args: [
                {
                    key: "number",
                    prompt:
                        "Please specify the number of times you wanna loop the song.",
                    type: "string",
                },
            ],
            examples: ["!loop"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message, { number }) {
        try {
            if (0 <= Number(number) && Number(number) <= 2) {
                let mode = distube.setRepeatMode(message, parseInt(number));
                mode = mode
                    ? mode == 2
                        ? "Repeat queue"
                        : "Repeat song"
                    : "Off";
                message.channel.send("Set repeat mode to `" + mode + "`");
                return;
            } else {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(
                        message.author.username,
                        message.author.displayAvatarURL()
                    )
                    .setTitle("ERROR")
                    .setColor("RED")
                    .setDescription(
                        `Please use a number between **0** and **2**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`
                    );

                message.embed(embed);
            }
        } catch (err) {
            console.error(err);
        }
    }
};
