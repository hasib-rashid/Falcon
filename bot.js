require("dotenv").config();

const app = require("express")();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Server is up and running");
});

app.listen(PORT);

require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

const { aPrefix } = require("discord_auto_prefix");
const prefix = new aPrefix();

client.login(process.env.TOKEN);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["command", "events"].forEach((handler) => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member)
        message.member = await message.guild.fetchMember(message);

    if (command.length === 0) return;

    const PREFIX = await prefix.fetchPrefix(message);

    if (!message.content.startsWith(PREFIX)) return;
    const args = message.content.slice(PREFIX.length).split(" ");
    const command = args.shift().toLowerCase();
});
