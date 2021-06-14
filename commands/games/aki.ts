import Command from '../../constants/command';
import { Aki, regions } from "aki-api.ts";
import { stripIndents } from 'common-tags';
import { verify } from '../../util/Util'
import { Message, MessageEmbed } from 'discord.js'

const AkiCommand: Command = {
	name: 'aki',
	description: 'description',
	aliases: [
		''
	],
	guildOnly: false,
	ownerOnly: false,
	disabled: false,
	nsfw: false,
	cooldown: 0,

	async run(client, message, args) {
		let ans = null;
		let win = false;
		let timesGuessed = 0;
		let guessResetNum = 0;
		let wentBack = false;
		let forceGuess = false;
		const guessBlackList: string[] = [];

		// @ts-ignore
		const aki = new Aki("en", message.guild && message.channel.nsfw)

		while (timesGuessed < 3) {
			if (guessResetNum > 0) guessResetNum--;

			if (ans === null) {
				await aki.start();
			}
			else if (wentBack) {
				wentBack = false;
			}
			else {
				try { await aki.step(ans); }
				catch (err) { await aki.step(ans); }
			}

			if (!aki.answers || aki.currentStep >= 79) forceGuess = true;

			const answers = aki.answers.map((answer: string) => answer.toLowerCase());

			answers.push("end");
			if (aki.currentStep > 0) answers.push("back");

			const embed = new MessageEmbed()
				.setColor("#227ef5")
				.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1dN4TLf1iHslTjNFoeSUtzFhefd35zHInsWc4J1zvCQdU3zRH1sarzIHLVirNqnt3b5I&usqp=CAU")
				.setAuthor(message.author.tag, message.author.displayAvatarURL() || message.author.defaultAvatarURL)
				.setTitle(
					`Akinator: **${aki.currentStep + 1}.**  (${Math.round(
						(aki.progress, 10)
					)}%)`
				)
				.addField(`Question ${aki.currentStep + 1}`, aki.question)
				.addField("Answers", `**${aki.answers.map((answer: string) => {
					if (answer.split(" ").length === 1) return `[${answer.split("")[0]}]${answer.slice(1)}`;
					return `[${answer.split(" ").map((str: string) => str.split("")[0]).join("").toUpperCase()}] ${answer}`;
				}).join(" | ")
					}${aki.currentStep > 0 ? " | [B]ack " : ""} | [E]nd**`)

			await message.channel.send(embed)

			const filter = (res: Message) => {
				return (
					(res.author.id === message.author.id) &&
					(answers
						.map(str => {
							return str
								.split(" ")
								.map(s => s.split("")[0].toLowerCase())
								.join("");
						})
						.includes(res.content.toLowerCase()))
				);
			};

			const messages = await message.channel.awaitMessages(filter, {
				max: 1,
				time: 60 * 1000,
			});

			if (!messages.size) {
				await message.channel.send("The game has timed out due to inactivity");
				win = false;
				break;
			}
			const pick = messages.first()?.content.toLowerCase();

			if (pick === "e") {
				forceGuess = true;
			}
			else if (pick === "b") {
				wentBack = true;
				await aki.back();
				continue;
			}
			else {
				ans = answers.map(str => {
					if (str.split(" ").length === 1) return str.split("")[0].toLowerCase();
					return str.split(" ").map(s => s.split("")[0]).join("").toLowerCase();
				})
					// @ts-ignore
					.indexOf(pick);
			}

			if ((aki.progress >= 90 && !guessResetNum) || forceGuess) {
				timesGuessed++;
				guessResetNum += 10;

				await aki.win();

				const guess = aki.answers.filter((g) => !guessBlackList.includes(g.id))[0];

				if (!guess) {
					message.channel.send("I cannot think of anyone... ");
					win = true;
					break;
				}

				guessBlackList.push(guess.id);

				await message.channel.send(
					new MessageEmbed()
						.setTitle(forceGuess ? "Final Guess" : `Guess Number: ${timesGuessed + 1}`)
						.setColor("#227ef5")
						.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1dN4TLf1iHslTjNFoeSUtzFhefd35zHInsWc4J1zvCQdU3zRH1sarzIHLVirNqnt3b5I&usqp=CAU")
						.setAuthor(message.author.tag, message.author.displayAvatarURL())
						.setDescription(stripIndents`
							I am ${Math.round(guess.proba * 100)}% sure that your character is:
							**Name:** ${guess.name}
							${guess.description ? `**Description:** ${guess.description}` : ""}
							Please respond with [Y]es or [N]o to continue
						`)
						.setThumbnail(guess.absolute_picture_path || null),
				);

				const verification = await verify(message);

				if (verification === 0) {
					// @ts-ignore
					win = "time";
					break;
				}
				else if (verification) {
					win = false;
					break;
				}
				else {
					await message.channel.send(
						new MessageEmbed()
							.setColor("RED")
							.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1dN4TLf1iHslTjNFoeSUtzFhefd35zHInsWc4J1zvCQdU3zRH1sarzIHLVirNqnt3b5I&usqp=CAU")
							.setAuthor(message.author.tag, message.author.displayAvatarURL() || message.author.defaultAvatarURL)
							.setTitle("Akinator")
							.setDescription(`🤔 Hmm, is that so? ${(forceGuess || timesGuessed >= 3) ? "I give up!" : "I can keep going!"}`),
					);

					if (timesGuessed >= 3 || forceGuess) {
						win = true;
						break;
					}
				}
			}
		}
		// @ts-ignore
		if (win === "time") return message.channel.send("Your silence has led me to the conclusion that I won");
		if (win) {
			return message.channel.send(
				new MessageEmbed()
					.setColor("GREEN")
					.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1dN4TLf1iHslTjNFoeSUtzFhefd35zHInsWc4J1zvCQdU3zRH1sarzIHLVirNqnt3b5I&usqp=CAU")
					.setTitle("Akinator")
					.setTimestamp()
					.setDescription("You've defeated me this time"),
			);
		}

		return message.channel.send(
			new MessageEmbed()
				.setColor("#227ef5")
				.setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1dN4TLf1iHslTjNFoeSUtzFhefd35zHInsWc4J1zvCQdU3zRH1sarzIHLVirNqnt3b5I&usqp=CAU")
				.setTitle("Akinator")
				.setTimestamp()
				.setDescription("This time, I win. Better luck next time!"),
		);
	}
}

export default AkiCommand;