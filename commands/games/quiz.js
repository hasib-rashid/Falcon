const Discord = require("discord.js");
const commando = require("discord.js-commando");
const axios = require("axios").default;
const oneLine = require("common-tags").oneLine;
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
                    default: "",
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
    async run(message, { type, difficulty }) {
        try {
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
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
        } catch (err) {
            message.say(
                `Oh no, an error occurred: \`${err.message}\`. Try again later!`
            );
            console.error(err);
        }
    }
};
