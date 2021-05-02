require("dotenv").config();

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const oneLine = require("common-tags").oneLine;
const axios = require("axios").default;

module.exports = class GithubCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: "github",
            aliases: [],
            group: "search",
            memberName: "github",
            description: "Watch what is at github right now",
            details: oneLine`
                Watch what is at github right now
            `,
            examples: ["!github <user> <repo_name>"],
        });
    }

    /**
     * @param {commando.CommandoMessage} message
     */

    async run(message) {
        try {
            const args = message.content.split(" ").slice(1);

            if (!args) return message.channel.send("**Please Specify the username and the repo or just the username of the github profile you want. Example: `github {username}` or `github {username} {repo-name}`**")

            if (!args[1]) {
                axios.get(`https://api.github.com/users/${args[0]}`).then(function (response) {
                    console.log(response.data)
                })
            }

            if (args[1]) {
                axios.get(`https://api.github.com/repos/${args[0]}/${args[1]}`).then(function (response) {
                    console.log(response.data)
                })
            }
        } catch (err) {
            if (err.status === 404)
                return message.say("❌ Could not find any results.");
            return message.reply(
                `Oh no, an error occurred: \`${err.message}\`. Try again later!`
            );
        }
    }
};
