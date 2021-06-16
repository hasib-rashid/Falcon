import Command from '../../constants/command';
import { stripIndents } from 'common-tags'
import { shuffle, list } from '../../util/Util'
import { default as axios } from 'axios'
import { MessageEmbed } from 'discord.js';
const choices = ['A', 'B', 'C', 'D'];

const TriviaCommand: Command = {
    name: 'trivia',
    description: 'Play trivia in discord',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {

        axios
            .get("https://opentdb.com/api.php?", {
                params: {
                    amount: 1,
                    type: "multiple",
                    encode: "url3986",
                    difficulty: "easy"
                }
            })
            .then(async function (request) {
                if (!request.data.results)
                    return message.channel.send(
                        "Oh no, a question could not be fetched. Try again later!"
                    );
                const answers = request.data.results[0].incorrect_answers.map(
                    (answer: any) => decodeURIComponent(answer.toLowerCase())
                );
                const correct = decodeURIComponent(
                    request.data.results[0].correct_answer.toLowerCase()
                );
                answers.push(correct);
                const embed = new MessageEmbed()
                    .setTitle(
                        "You have 15 seconds to answer this question:"
                    )
                    .setFooter("FalconX")
                    .setColor("#1495f7").setDescription(stripIndents`
                            **${decodeURIComponent(
                        request.data.results[0].category
                    )}**
                            ${request.data.results[0].type === "boolean"
                            ? "**True or False:** "
                            : ""
                        }${decodeURIComponent(
                            request.data.results[0].question
                        )}
                        ${request.data.results[0].type === "multiple"
                            ? `\n**Choices:**\n ${list(
                                shuffle(answers),
                                "\n"
                            )}`
                            : ""
                        }
                    `);

                await message.channel.send(embed);
                const messages = await message.channel.awaitMessages(
                    (res) => res.author.id === message.author.id,
                    {
                        max: 1,
                        time: 15000,
                    }
                );
                if (!messages.size)
                    return message.channel.send(
                        `**Your time ended! The correct answer was \`${correct}\`**`
                    );
                if (messages.first()?.content.toLowerCase() !== correct)
                    return message.channel.send(
                        `**The Correct answer was \`${correct}\`.**`
                    );
                return message.channel.send(
                    "**Nice job! 10/10! You deserve some cake!**"
                );
            })
            .catch((error) => console.error(error));
    },
}

export default TriviaCommand;