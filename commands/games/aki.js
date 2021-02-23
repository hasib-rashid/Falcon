const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const { stripIndents } = require("common-tags");
const { Aki, regions } = require("aki-api");
const { list, verify } = require("../../util/Util");

module.exports = class AkinatorCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "akinator",
            aliases: ["aki"],
            group: "games",
            memberName: "akinator",
            description: "Play with Akinator :O",
            details: oneLine`
                Play with Akinator :O
            `,
            examples: ["!aki"],
            credit: [
                {
                    name: "Akinator",
                    url: "https://en.akinator.com/",
                    reason: "API",
                },
            ],
            args: [
                {
                    key: "region",
                    prompt: `What region do you want to use? Either ${list(
                        regions,
                        "or"
                    )}.`,
                    type: "string",
                    default: "en",
                    oneOf: regions,
                    parse: (region) => region.toLowerCase(),
                },
            ],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message, { region }) {
        try {
            try {
                const aki = new Aki(region, !message.channel.nsfw);
                let ans = null;
                let win = false;
                let timesGuessed = 0;
                let guessResetNum = 0;
                let wentBack = false;
                let forceGuess = false;
                const guessBlacklist = [];
                while (timesGuessed < 3) {
                    if (guessResetNum > 0) guessResetNum--;
                    if (ans === null) {
                        await aki.start();
                    } else if (wentBack) {
                        wentBack = false;
                    } else {
                        try {
                            await aki.step(ans);
                        } catch {
                            await aki.step(ans);
                        }
                    }
                    if (!aki.answers || aki.currentStep >= 79)
                        forceGuess = true;
                    const answers = aki.answers.map((answer) =>
                        answer.toLowerCase()
                    );
                    answers.push("end");

                    const embed = new Discord.MessageEmbed()
                        .setAuthor(
                            message.author.username,
                            message.author.avatarURL()
                        )
                        .setColor("GREEN")
                        .setTitle(
                            `Akinator: **${aki.currentStep + 1}.** ${
                                aki.question
                            } (${Math.round(
                                Number.parseInt(aki.progress, 10)
                            )}%)`
                        )
                        .setDescription(
                            `${aki.answers.join(" | ")}${
                                aki.currentStep > 0 ? ` | Back` : ""
                            } | End`
                        )
                        .setFooter("Akinator by CodeVert");

                    if (aki.currentStep > 0) answers.push("back");

                    await message.channel.send(embed);

                    const filter = (res) =>
                        res.author.id === message.author.id &&
                        answers.includes(res.content.toLowerCase());
                    const msgs = await message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000,
                    });
                    if (!msgs.size) {
                        await message.say("Sorry, time is up!");
                        win = "time";
                        break;
                    }
                    const choice = msgs.first().content.toLowerCase();
                    if (choice === "end") {
                        forceGuess = true;
                    } else if (choice === "back") {
                        if (guessResetNum > 0) guessResetNum++;
                        wentBack = true;
                        await aki.back();
                        continue;
                    } else {
                        ans = answers.indexOf(choice);
                    }
                    if ((aki.progress >= 90 && !guessResetNum) || forceGuess) {
                        timesGuessed++;
                        guessResetNum += 10;
                        await aki.win();
                        const guess = aki.answers.filter(
                            (g) => !guessBlacklist.includes(g.id)
                        )[0];
                        if (!guess) {
                            await message.say("I can't think of anyone.");
                            win = true;
                            break;
                        }
                        guessBlacklist.push(guess.id);
                        const embed = new Discord.MessageEmbed()
                            .setColor("GREEN")
                            .setTitle(
                                `I'm ${Math.round(
                                    guess.proba * 100
                                )}% sure it's...`
                            )
                            .setDescription(
                                stripIndents`
							${guess.name}${guess.description ? `\n_${guess.description}_` : ""}
							_**Type [y]es or [n]o to continue.**_
						`
                            )
                            .setImage(guess.absolute_picture_path || null)
                            .setFooter(
                                forceGuess
                                    ? "Final Guess"
                                    : `Guess ${timesGuessed}`
                            );
                        await message.embed(embed);
                        const verification = await verify(
                            message.channel,
                            message.author
                        );
                        if (verification === 0) {
                            win = "time";
                            break;
                        } else if (verification) {
                            win = false;
                            break;
                        } else if (timesGuessed >= 3 || forceGuess) {
                            win = true;
                            break;
                        } else {
                            await message.say(
                                "Hmm... Is that so? I can keep going!"
                            );
                        }
                    }
                }
                if (win === "time")
                    return message.say(
                        "I guess your silence means I have won."
                    );
                if (win) return message.say("Bravo, you have defeated me.");
                return message.say(
                    "Guessed right one more time! I love playing with you!"
                );
            } catch (err) {
                console.error(err);
            }
        } catch (err) {
            console.error(err);
        }
    }
};
