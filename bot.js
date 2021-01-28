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
const request = require("node-superfetch");
const formatter = require("bob-number-formatter");
const config = require("./config.json");
const handler = require("d.js-command-handler");

const { aPrefix } = require("discord_auto_prefix");
const prefix = new aPrefix();

client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`${client.channels.cache.size} Channels | !help`, {
        type: "WATCHING",
    });
});

client.on("guildMemberAdd", ({ member, guild }) => {
    const channel = member.guild.channels.find(
        (channel) => channel.name === "welcome"
    );

    const memberCount = guild.members.filter((member) => !member.user.client)
        .size;

    if (!channel) return;

    const join_embed = new Discord.MessageEmbed()
        .setTitle(`A New Programmer Just Arrived!`)
        .setAuthor(`Everybody Welcome ${member}. Hope you have a great Stay`)
        .setDescription(
            `Welcome!

            Hey there, welcome to ${guild.name}, the discord server!
            
            We're a  friendly community focused around the programming languages, open to those who wish to learn the languages or improve their skills, as well as those looking to help others.
            
            We organise regular community events and have a dedicated staff of talented developers available to assist around the clock. Whether you're looking to learn the languages or working on a complex project, we've got someone who can help you if you get stuck.
    
    
            Find us at
            GitHub: https://github.com/Hall-of-Programmers`
        )
        .setColor("RANDOM");

    channel.send(join_embed);
    console.log(
        `${member.tag} just joined ${guild.name} which has ${memberCount}`
    );
});

client.on("guildMemberRemove", ({ member, guild }) => {
    const channel = member.guild.channels.find(
        (channel) => channel.name === "welcome"
    );

    var memberCount = guild.members.filter((member) => !member.user.client)
        .size;

    if (!channel) return;

    const left_embed = new Discord.MessageEmbed()
        .setTitle(`A Programmer Left the Server ; (`)
        .setAuthor(
            `Everybody, ${member} just left the server.... Hope he comes back or had a nice journey together....`
        )
        .setColor("RANDOM");

    channel.send(left_embed);
    console.log(
        `${member.tag} just joined ${guild.name} which has ${memberCount}`
    );
});

client.on("guildCreate", async (guild) => {
    prefix.defaultPrefix(guild, "!");
    guild.roles.create({ name: "Muted", color: "#313131" });
    console.log("Joined a new server: " + guild.name);
    console.log("It has " + guild.memberCount + " members ;)");
});

client.on("guildDelete", async (guild) => {
    prefix.deletePrefix(guild);
    console.log("Left the server:" + guild.name);
});

handler(__dirname + "/commands", client);

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
