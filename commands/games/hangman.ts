import { MessageEmbed } from 'discord.js';
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
        const topics = ["", "Countries", "Capital Cities", "Food", "Movies", "Bands",
            "Animals", "Computers", "Compound Words", "Pokémon"];

        //const botOn = false;
        let gameOn = false;
        const nonAlphaFlag = false;
        let randNum;

        // Hangman Game constiables
        let playWord = "";
        const boardWord = "";
        const damage = 0;
        const guessedList = "";
        const solvedList = []

        const missList = "Missed Guesses: ";
        const helperTopic = "Topic: ";
        const helperBoard = new MessageEmbed();
        const gameBoard = new MessageEmbed();
        const hangASCII = [
            "+---------+\n |                |\n                  |\n                  |\n                  |\n                  |\n                  |\n                  |\n===============\n",
            "+---------+\n |                |\nO               |\n                  |\n                  |\n                  |\n                  |\n                  |\n===============\n",
            "+---------+\n |                |\nO               |\n |                |\n                  |\n                  |\n                  |\n                  |\n===============\n",
            "+---------+\n  |               |\n O              |\n/|               |\n                  |\n                  |\n                  |\n                  |\n===============\n",
            "+---------+\n  |               |\n O              |\n/|\\            |\n                  |\n                  |\n                  |\n                  |\n===============\n",
            "+---------+\n  |               |\n O              |\n/|\\            |\n/                |\n                  |\n                  |\n                  |\n===============\n",
            "+---------+\n  |               |\n O              |\n/|\\            |\n/ \\            |\n                  |\n                  |\n                  |\n===============\n"
        ]
        const healthCode = ["0022FF", "00EFFF", "2BFF00", "F7FF00", "FF7700", "FF0000", "000000"]
        const reaction_numbers = ["\u0030\u20E3", "\u0031\u20E3", "\u0032\u20E3", "\u0033\u20E3", "\u0034\u20E3", "\u0035\u20E3", "\u0036\u20E3", "\u0037\u20E3", "\u0038\u20E3", "\u0039\u20E3"]


        const bm = "";
        const correctAnswer = "";
        const mainMenu = new MessageEmbed()
            .setTitle("Topic Select")
            .setDescription("Please select a topic by typing in '!topic <number>' ")
            .addField(reaction_numbers[1] + " " + topics[1], "-----------")
            .addField(reaction_numbers[2] + " " + topics[2], "-----------")
            .addField(reaction_numbers[3] + " " + topics[3], "-----------")
            .addField(reaction_numbers[4] + " " + topics[4], "-----------")
            .addField(reaction_numbers[5] + " " + topics[5], "-----------")
            .addField(reaction_numbers[6] + " " + topics[6], "-----------")
            .addField(reaction_numbers[7] + " " + topics[7], "-----------")
            .addField(reaction_numbers[8] + " " + topics[8], "-----------")
            .addField("⭕ Dynamic Topics ⭕", "These topics contain subcategories and are accessed by:\n '!topic <subcategory>")
            .addField("⭕ Pokemon", "Kanto, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola ")
            .setThumbnail("https://cdn3.iconfinder.com/data/icons/brain-games/128/Hangman-Game.png")
            .setColor('1BB2F3')

        const helpBoard = new MessageEmbed()
            .setTitle("Help")
            .addField("!topic <number>", "Starts a game with the chosen topic")
            .addField("!topic <category>", "Starts a game with the chosen dynamic topic")
            .addField("!guess <letter>", "Guesses a letter in the game")
            .addField("!solve '<string>'", "Attempts to end the game by solving the word")
            .setColor('0022FF')

























        function getPlayWord(topic: any, numWords: any) {
            var randomNum = Math.floor(Math.random() * numWords);
            return topic[randomNum];
        }

        function resetGame() {
            //botOn = false;
            gameOn = false;
            playWord = "";
            boardWord = "";
            damage = 0;
            guessedList = "";
            guessedList = []

            missList = "Missed Guesses: ";
            helperTopic = "Topic: ";
        }

        function findTwoQuotes(string) {
            var j;
            var quotesFound = 0;
            for (j = 0; j < string.length; j++) {
                if (string.charAt(j) === "'") {
                    quotesFound = quotesFound + 1;
                }
            }
            if (quotesFound === 2) {
                return true;
            } else {
                return false;
            }
        }

        function badManners() {
            const badManner = ["loser!", "idiot!", "bozo!", "moron!", "knucklehead!", "Einstein!", "nincompoop!", "nitwit!", "fool!"];
            var rand = Math.floor(Math.random() * 9);
            return badManner[rand];
        }

        //All functions below this comment were repurposed from my Oatmeal Bot
        function generateBoardWord(gameWord) {
            var i;
            var bWord = "";
            for (i = 0; i < gameWord.length; i++) {
                if (gameWord[i] === ' ') {
                    bWord = bWord + ' ';
                } else {
                    bWord = bWord + '-';
                }
            }

            return bWord;
        }

        function alphaCheck(input) {
            return input.match("^[a-zA-Z]+$");
        }

        function checkIfGuessed(gList, guess) {
            var j;
            var doubleFlag = false;
            if (gList.length !== undefined) {
                for (j = 0; j < gList.length; j++) {
                    if (gList[j] === guess) {
                        doubleFlag = true;
                    }
                }
            }

            return doubleFlag;
        }

        /** Author of this Function: Efe Naci Giray
         * Retrieved from https://gist.github.com/efenacigiray/9367920
         * November 5 2018
         */
        function replaceAt(string, index, replace) {
            return string.substring(0, index) + replace + string.substring(index + 1);
        }
    },
}

export default HangmanCommand;