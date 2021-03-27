const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const embedbuilder = require("../../util/embedBuilder.js");

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "search",
            aliases: [],
            group: "music",
            memberName: "search",
            description: "Search a song from youtube and play here",
            details: oneLine`
                Search a song from youtube and play here
            `,
            examples: ["!search <song_name>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message) {
        try {
            embedbuilder(
                client,
                message,
                "GREEN",
                "Searching!",
                args.join(" ")
            );

            let result = await this.client.distube.search(args.join(" "));

            let searchresult = "";

            for (let i = 0; i <= result.length; i++) {
                try {
                    searchresult += await `**${i + 1}**. ${
                        result[i].name
                    } - \`${result[i].formattedDuration}\`\n`;
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

            return this.client.distube.play(message, result[userinput - 1].url);
        } catch (err) {
            message.channel.send("**You are not in a voice channel");
        }
    }
};
