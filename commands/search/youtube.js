const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const axios = require("axios").default;

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "youtube",
            aliases: [],
            group: "search",
            memberName: "youtube",
            description: "Search Youtube from here!",
            details: oneLine`
                Search Youtube from here!
            `,
            examples: ["!youtube Rick Roll"],
            args: [
                {
                    key: "query",
                    type: "string",
                    prompt: "What do you want to search on youtube?",
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message, { query }) {
        const options = {
            method: "GET",
            url: "https://youtube-v31.p.rapidapi.com/search",
            params: {
                q: query,
                part: "snippet,id",
                regionCode: "US",
                maxResults: "7",
                order: "date",
            },
            headers: {
                "x-rapidapi-key":
                    "616e3d86cbmsh19e94e8d6df2d94p13e47ejsne5e9296c68cb",
                "x-rapidapi-host": "youtube-v31.p.rapidapi.com",
            },
        };

        axios
            .request(options)
            .then(function (response) {
                const embed = new Discord.MessageEmbed()
                    .setAuthor(
                        "Youtube",
                        "https://www.freepnglogos.com/uploads/youtube-logo-icon-transparent---32.png"
                    )
                    .setColor("#fa2f44");
                for (var i = 0; i < response.data.items.length; ++i) {
                    var result = response.data.items[i];

                    embed.addField(
                        `**${result.snippet.channelTitle}** - ${result.snippet.title}`,
                        `[Link](https://youtube.com/watch?v=${result.id.videoId}), [Channel Link](https://youtube.com/channel/${result.snippet.channelId}) - ${result.snippet.description}`
                    );
                }

                message.say(embed);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
};
