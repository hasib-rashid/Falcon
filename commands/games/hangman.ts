import { Message, MessageReaction, PermissionResolvable } from 'discord.js';
import Command from '../../constants/command';

const HangmanCommand: Command = {
    name: 'hangman',
    description: 'Play hangman in discord',
    aliases: [
        ''
    ],
    guildOnly: false,
    ownerOnly: false,
    disabled: false,
    nsfw: false,
    cooldown: 0,

    async run(client, message, args) {
        function start(permission: PermissionResolvable) {
            var letters = [
                "🇦",
                "🇧",
                "🇨",
                "🇩",
                "🇪",
                "🇫",
                "🇬",
                "🇭",
                "🇮",
                "🇯",
                "🇰",
                "🇱",
                "🇲",
                "🇳",
                "🇴",
                "🇵",
                "🇶",
                "🇷",
                "🇸",
                "🇹",
                "🇺",
                "🇻",
                "🇼",
                "🇽",
                "🇾",
                "🇿",
            ];
            var unicode = [
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
                "y",
                "z",
            ];
            var games: any = [];

            var stages = [
                `\`\`\`
          /---|
          |   
          |
          |
          |
          \`\`\`
          `,
                `\`\`\`
          /---|
          |   o
          |
          |
          |
          \`\`\`
          `,
                `\`\`\`
          /---|
          |   o
          |   |
          | 
          |
          \`\`\`
          `,
                `\`\`\`
          /---|
          |   o
          |  /|
          |
          |
          \`\`\`
          `,
                `\`\`\`
          /---|
          |   o
          |  /|\\
          |
          |
          \`\`\`
          `,
                `\`\`\`
          /---|
          |   o
          |  /|\\
          |  /
          |
          \`\`\`
          `,
                `\`\`\`
          /---|
          |   o ~ thanks
          |  /|\\
          |  / \\
          |
          \`\`\`
          `,
            ];
            function generateMessage(phrase: any, guesses: any) {
                var s = "";
                for (var i = 0; i < phrase.length; i++) {
                    if (phrase[i] == " ") s += " ";
                    else {
                        var c = phrase[i];
                        if (guesses.indexOf(c) == -1) c = "\\_";
                        s += "__" + c + "__ ";
                    }
                }
                return s;
            }
            function nextLetter(message: Message, index: any, word: string) {
                message.react(letters[index]).then((r: any) => {
                    index++;
                    if (index < letters.length) {
                        if (index == 13) {
                            message.channel
                                .send(generateMessage(word, []))
                                .then((m: any) => {
                                    games.push({
                                        stage: 0,
                                        msg0: message,
                                        msg1: m,
                                        phrase: word,
                                        guesses: [],
                                    });
                                    // @ts-ignore
                                    nextLetter(m, index);
                                });
                        } else {
                            // @ts-ignore
                            nextLetter(message, index, word);
                        }
                    }
                });
            }

            client.on("messageReactionAdd", (reaction: MessageReaction, user: any) => {
                var msg = reaction.message;
                if (!user.bot) {
                    for (var i = 0; i < games.length; i++) {
                        var game = games[i];
                        if (
                            (msg.id == game.msg0.id || msg.id == game.msg1.id) &&
                            game.stage < stages.length
                        ) {
                            var letter =
                                unicode[letters.indexOf(reaction.emoji.name)];

                            reaction.users.fetch().then((usrs: any) => {
                                var reactors = usrs.array();
                                var remove_next = function (index: any) {
                                    if (index < reactors.length)
                                        reaction//@ts-ignore
                                            .remove(reactors[index])
                                            .then(() => remove_next(index + 1));
                                };

                                remove_next(0);
                            });

                            if (game.guesses.indexOf(letter) == -1) {
                                game.guesses.push(letter);
                                if (game.phrase.indexOf(letter) == -1) {
                                    game.stage++;
                                    game.msg0.edit(stages[game.stage]);
                                } else {
                                    var sik = true;
                                    for (var j = 0; j < game.phrase.length; j++) {
                                        var c = game.phrase[j];
                                        if (
                                            c != " " &&
                                            game.guesses.indexOf(c) == -1
                                        ) {
                                            sik = false;
                                        }
                                    }

                                    if (sik) {
                                        game.msg0.edit(
                                            stages[game.stage].replace(
                                                "o",
                                                "o ~ ur alright.. for now"
                                            )
                                        );
                                    }

                                    game.msg1.edit(
                                        generateMessage(game.phrase, game.guesses)
                                    );
                                }
                            }
                        }
                        games[i] = game;
                    }
                }
            });
            if (permission) {
                if (!message.member?.permissions.has(permission))
                    return message.reply(
                        `You need ${permission} permission to use this command.`
                    );
                message.channel.send(stages[0]).then((m: any) => {
                    // @ts-ignore
                    nextLetter(m, 0, word);
                });
            } else {
                message.channel.send(stages[0]).then((m: any) => {
                    // @ts-ignore
                    nextLetter(m, 0, this.word);
                });
            }
        }
    },
}

export default HangmanCommand;