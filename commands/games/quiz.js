const Discord = require("discord.js");
const commando = require("discord.js-commando");
const axios = require("axios").default;
const { oneLine, stripIndents } = require("common-tags");
const { shuffle, list } = require("../../util/Util");
const types = ["multiple", "boolean"];
const difficulties = ["easy", "medium", "hard"];

module.exports = class ClassName extends commando.Command {
    constructor(client) {
        super(client, {
            name: "quiz",
            aliases: [],
            group: "games",
            memberName: "quiz",
            description: "Play quiz here!",
            details: oneLine`
                Play quiz here!
            `,
            examples: ["!quiz"],
            args: [
                {
                    key: "type",
                    prompt: `Which type of question would you like to have? Either ${list(
                        types,
                        "or"
                    )}.`,
                    type: "string",
                    validate: (type) => {
                        if (types.includes(type.toLowerCase())) return true;
                        return `Invalid type, please enter either ${list(
                            types,
                            "or"
                        )}.`;
                    },
                    parse: (type) => type.toLowerCase(),
                },
                {
                    key: "difficulty",
                    prompt: `What should the difficulty of the game be? Either ${list(
                        difficulties,
                        "or"
                    )}.`,
                    type: "string",
                    validate: (difficulty) => {
                        if (difficulties.includes(difficulty.toLowerCase()))
                            return true;
                        return `Invalid difficulty, please enter either ${list(
                            difficulties,
                            "or"
                        )}.`;
                    },
                    parse: (difficulty) => difficulty.toLowerCase(),
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */
    async run(message, args) {
        try {
            const { type, difficulty } = args;
            const options = {
                method: "GET",
                url: "https://opentdb.com/api.php?",
                params: {
                    amount: 1,
                    type: type,
                    encode: "url3986",
                    difficulty: difficulty,
                },
            };

            axios
                .request(options)
                .then(async function (request) {
                    if (!request.data.results)
                        return message.say(
                            "Oh no, a question could not be fetched. Try again later!"
                        );
                    const answers = request.data.results[0].incorrect_answers.map(
                        (answer) => decodeURIComponent(answer.toLowerCase())
                    );
                    const correct = decodeURIComponent(
                        request.data.results[0].correct_answer.toLowerCase()
                    );
                    answers.push(correct);
                    const embed = new Discord.MessageEmbed()
                        .setTitle(
                            "You have 15 seconds to answer this question:"
                        )
                        .setFooter("FalconX")
                        .setColor("#1495f7").setDescription(stripIndents`
                                **${decodeURIComponent(
                                    request.data.results[0].category
                                )}**
                                ${
                                    type === "boolean"
                                        ? "**True or False:** "
                                        : ""
                                }${decodeURIComponent(
                        request.data.results[0].question
                    )}
                            ${
                                type === "multiple"
                                    ? `\n**Choices:**\n ${list(
                                          shuffle(answers),
                                          "\n"
                                      )}`
                                    : ""
                            }
                        `);

                    await message.embed(embed);
                    const messages = await message.channel.awaitMessages(
                        (res) => res.author.id === message.author.id,
                        {
                            max: 1,
                            time: 15000,
                        }
                    );
                    if (!messages.size)
                        return message.say(
                            `**Your time ended! The correct answer was \`${correct}\`**`
                        );
                    if (messages.first().content.toLowerCase() !== correct)
                        return message.say(
                            `**The Correct answer was \`${correct}\`.**`
                        );
                    return message.say(
                        "**Nice job! 10/10! You deserve some cake!**"
                    );
                })
                .catch((error) => console.error(error));
        } catch (err) {
            message.say(
                `**Oh no, an error occurred: \`${err.message}\`. Try again later!**`
            );
            console.error(err);
        }
    }
};
