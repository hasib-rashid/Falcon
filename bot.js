const app = require("express")();
app.get("/", (req, res) => {
    res.send("Server is up and running");
});
app.listen(8080);

require("dotenv").config();

const Discord = require("discord.js");
const bot = new Discord.Client();
const request = require("node-superfetch");
const formatter = require("bob-number-formatter");
const config = require("./config.json");

const { aPrefix } = require("discord_auto_prefix");
const prefix = new aPrefix();

bot.login(process.env.TOKEN);

bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity(`${bot.channels.size} Channels | !help`, {
        type: "WATCHING",
    });
});

bot.on("guildMemberAdd", ({ member, guild }) => {
    const channel = member.guild.channels.find(
        (channel) => channel.name === "welcome"
    );

    var memberCount = guild.members.filter((member) => !member.user.bot).size;

    if (!channel) return;

    const join_embed = new Discord.RichEmbed()
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

bot.on("guildMemberRemove", ({ member, guild }) => {
    const channel = member.guild.channels.find(
        (channel) => channel.name === "welcome"
    );

    var memberCount = guild.members.filter((member) => !member.user.bot).size;

    if (!channel) return;

    const left_embed = new Discord.RichEmbed()
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

bot.on("guildCreate", async (guild) => {
    prefix.defaultPrefix(guild, "!");
    guild.createRole({ name: "Muted", color: "#313131" });
    console.log("Joined a new server: " + guild.name);
    console.log("It has " + guild.memberCount + " members ;)");
});

bot.on("guildDelete", async (guild) => {
    prefix.deletePrefix(guild);
    console.log("Left the server:" + guild.name);
});

bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    const PREFIX = await prefix.fetchPrefix(message);

    if (!message.content.startsWith(PREFIX)) return; //If mesage isn't start with prefix then return
    const args = message.content.slice(PREFIX.length).split(" "); //Config Args(Arguements)
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        message.channel.send(`PONG! my prefix is ${PREFIX}`);
    }

    if (command === "setprefix") {
        if (!message.member.hasPermission("MANAGE_GUILD")) return;
        if (!args) return message.channel.send("No prefix was provided!");

        prefix.setPrefix(message, args);
    }

    if (command == "prefix") {
        prefix.getGuildPrefix(message, client, args); //Fetch the prefix for a guild through name/id or the current guild
    }

    if (command === "ping") {
        message.channel.send("Loading data! :thinking:").then(async (msg) => {
            msg.delete();
            message.channel.send(
                `🏓 Pong! Your Latency is ${
                    msg.createdTimestamp - message.createdTimestamp
                }ms and API Latency is ${Math.round(bot.ping)} ms!`
            );
        });
    }

    if (command === "help") {
        const helpEmbed = new Discord.RichEmbed()
            .setTitle(`CodeVert commands list | prefix \`${config.prefix}\``)
            .addField(
                "**For Users**",
                "The under Commands are for the Users of the whole server :open_mouth:"
            )
            .addField(
                "```!hello```",
                "Greeting the user and introducing myself. :wave:"
            )
            .addField("```!ping```", "Your basic ping pong command :ping_pong:")
            .addField(
                "```!uptime```",
                "Seeing the bot's total time online! <a:chill_vro:783202719955419186>"
            )
            .addField(
                "```!avatar```",
                "Wanna Check your Avatar? Here you go! <a:chill_bruda:781006563749920818>"
            )
            .addField(
                "```!invite```",
                "Wanna invite People to the Server as quick as Possible? Run the Command and share the Link! <a:black_tick:781006394014302268>"
            )
            .addField("```!wiki```", "Search anything in WikiPedia")
            .addField("```!country```", "Search any Country in the world!")
            .addField(
                "**For Moderators**",
                "The under Commands are for Moderators"
            )
            .addField(
                "```!kick```",
                "Kicks the user mentioned, you know, use it whenever needed and kick him out the door :wink:"
            )
            .addField(
                "``!ban``",
                "Bans the user mentioned, be careful with the ban hammer, it really is heavy :eyes:"
            )
            .addField("```!mute```", "On Progress not to be used! :bangbang:")
            .addField("```!unmute```", "On Progress not to be used! :bangbang:")
            .addField("```!add```", "Adds role to a user, hooray :tada:")
            .addField("```!remove```", "Removes role from user, :sadface:")
            .addField(
                "```!purge```",
                "Delete Messages in a small period of time!"
            )
            .addField(
                "```!giveaway```",
                "Do a Giveaway! example: `!giveaway 10d Nitro Classic`"
            )
            .addField(
                "Server Games",
                "The under commands are for the games of the server to simply pass the time. :thumbsup:"
            )
            .addField(
                "``!rps``",
                "A Rock Paper Scissors Commands, No Cheating! :shell: :scissors: :newspaper2:"
            )
            .setImage(bot.user.avatarURL)
            .setColor("RANDOM");
        message.channel.send(helpEmbed);
    }

    if (command === "hello") {
        const hello_embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .addField(
                "Hey there! I am the Official Moderating Bot of Hall Of Programmers! If you need any help then type: !help",
                ":thumbsup:"
            )
            .setTitle(`Hello! ${message.author.username}! :wave:`)
            .addField(
                `Hope you have a fantastic day ${message.author.username}!`,
                ":wink:"
            );

        message.channel.send(hello_embed);
    }

    const member = message.mentions.members.first();
    if (!member)
        if (command === "avatar") {
            const avatar_embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setDescription(`**Avatar**`)
                .setTitle(`${message.author.username}'s Avatar`)
                .setImage(message.author.avatarURL);
            message.channel.send(avatar_embed);
        }

    let channel = message.channel;
    if (command === "invite") {
        channel.createInvite({ unique: true }).then((invite) => {
            message.channel.send(
                "**This Server's Invite Link** https://discord.gg/" +
                    invite.code
            );
        });
    }

    if (member) {
        if (command === "avatar") {
            const other_avatar_embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setDescription(`**Avatar**`)
                .setTitle(`${member.user.tag}'s Avatar`)
                .setImage(member.user.avatarURL);
            message.channel.send(other_avatar_embed);
        }
    }

    if (command === "giveaway") {
        var time = "";
        var time2 = "";
        var time3 = "";
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(
                "You don't have enough permissions to use this command."
            );
        if (command === `giveaway`)
            return message.channel.send(
                `You didn\'t state a duration or a price for the giveaway.`
            );
        if (command !== `giveaway`) {
            const stated_duration_hours = message.content.split(" ")[1];
            const stated_duration_hours2 = stated_duration_hours.toLowerCase();
            if (stated_duration_hours2.includes("s")) {
                var time = "s";
            }
            if (stated_duration_hours2.includes("m")) {
                var time = "m";
            }
            if (stated_duration_hours2.includes("h")) {
                var time = "h";
            }
            if (stated_duration_hours2.includes("d")) {
                var time = "d";
            }
            const stated_duration_hours3 = stated_duration_hours2.replace(
                time,
                ""
            );
            if (stated_duration_hours3 === "0") {
                message.channel.send("The duration has to be atleast one.");
            }
            if (isNaN(stated_duration_hours3)) {
                message.channel.send(
                    "The duration has to be a valid time variable."
                );
            }
            if (stated_duration_hours3 > 1) {
                var time3 = "s";
            }
            if (time === "s") {
                var actual_duration_hours = stated_duration_hours3 * 1000;
                var time2 = "second";
            }
            if (time === "m") {
                var actual_duration_hours = stated_duration_hours3 * 60000;
                var time2 = "minute";
            }
            if (time === "h") {
                var actual_duration_hours = stated_duration_hours3 * 3600000;
                var time2 = "hour";
            }
            if (time === "d") {
                var actual_duration_hours = stated_duration_hours3 * 86400000;
                var time2 = "day";
            }
            if (!isNaN(stated_duration_hours3)) {
                const prize = message.content.split(" ").slice(2).join(" ");
                if (prize === "")
                    return message.channel.send("You have to enter a price.");
                if (stated_duration_hours3 !== "0") {
                    const embed = new Discord.RichEmbed()
                        .setTitle(`${prize}`)
                        .setColor("36393F")
                        .setDescription(
                            `React with 🎉 to enter!\nTime duration: **${stated_duration_hours3}** ${time2}${time3}\nHosted by: ${message.author}`
                        )
                        .setTimestamp(Date.now() + actual_duration_hours)
                        .setFooter("Ends at");
                    let msg = await message.channel.send(
                        ":tada: **GIVEAWAY** :tada:",
                        embed
                    );
                    await msg.react("🎉");
                    setTimeout(() => {
                        setTimeout(() => {
                            let winner = msg.reactions.get("🎉").users.random();
                            if (msg.reactions.get("🎉").users.size < 1) {
                                const winner_embed = new Discord.MessageEmbed()
                                    .setTitle(`${prize}`)
                                    .setColor("36393F")
                                    .setDescription(
                                        `Winner:\nNo one entered the giveaway.\nHosted by: ${message.author}`
                                    )
                                    .setTimestamp()
                                    .setFooter("Ended at");
                                msg.edit(
                                    ":tada: **GIVEAWAY ENDED** :tada:",
                                    winner_embed
                                );
                            }
                            if (!msg.reactions.get("🎉").users.size < 1) {
                                const winner_embed = new Discord.RichEmbed()
                                    .setTitle(`${prize}`)
                                    .setColor("36393F")
                                    .setDescription(
                                        `Winner:\n${winner}\nHosted by: ${message.author}`
                                    )
                                    .setTimestamp()
                                    .setFooter("Ended at");
                                msg.edit(
                                    ":tada: **GIVEAWAY ENDED** :tada:",
                                    winner_embed
                                );
                            }
                        }, 1000);
                    }, actual_duration_hours);
                }
            }
        }
    }

    if (command === "kick") {
        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.channel.send(":no_entry: Insufficient permissions");
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send(":no_entry: No user mentioned.");
        const reason = args.slice(1).join(" ");
        if (!member.kickable)
            return message.channel.send(":no_entry: I cannot kick this user.");
        if (member) {
            if (!reason) {
                return member.kick().then((member) => {
                    const kicked_embed = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setTitle("Kicked Succesfully!")
                        .setAuthor(`Kicked by ${message.author.username}`)
                        .setDescription(
                            `${member.user.tag} was kicked by ${message.author}, no reason was provided.`
                        );
                    message.channel.send(kicked_embed);
                    console.log(`Succesfully Kicked ${user.tag}`);
                });
            }
            if (reason) {
                member.kick().then((member) => {
                    const banned_embed = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setTitle("Kicked Succesfully!")
                        .setAuthor(`Kicked by ${message.author.username}`)
                        .setDescription(
                            `${member.user.tag} was kicked by ${message.author} for ${reason}.`
                        );
                    message.channel.send(banned_embed);
                    console.log(`Succesfully Kicked ${user.tag}`);
                });
            }
        }
    }
    if (command === "ban") {
        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.channel.send(":no_entry: Insufficient permissions");
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send(":no_entry: No user mentioned.");
        const reason = args.slice(1).join(" ");
        if (!member.kickable)
            return message.channel.send(":no_entry: I cannot ban this user.");
        if (member) {
            if (!reason) {
                return member.ban().then((member) => {
                    const kicked_embed = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setTitle("Banned Succesfully!")
                        .setAuthor(`Banned by ${message.author.username}`)
                        .setDescription(
                            `${member.user.tag} was banned by ${message.author}, no reason was provided.`
                        );
                    message.channel.send(kicked_embed);
                    console.log(`Succesfully Banned ${user.tag}`);
                });
            }
            if (reason) {
                member.ban().then((member) => {
                    const banned_embed = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setTitle("Banned Succesfully!")
                        .setAuthor(`Banned by ${message.author.username}`)
                        .setDescription(
                            `${member.user.tag} was banned by ${message.author} for ${reason}.`
                        );
                    message.channel.send(banned_embed);
                    console.log(`Succesfully Banned ${user.tag}`);
                });
            }
        }
    }

    if (command === "add") {
        if (!message.member.hasPermission("MANAGE_ROLES"))
            return message.channel.send(":no_entry: Insufficient permissions");
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send(":no_entry: No user mentioned");
        const add = args.slice(1).join(" ");
        if (!add) return message.channel.send(":no_entry: No role said");
        const roleAdd = message.guild.roles.find((role) => role.name === add);
        if (!roleAdd)
            return message.channel.send(":no_entry: Role does not exist");
        if (member.roles.has(roleAdd.id)) {
            return message.channel.send(":no_entry: User already has role");
        }
        if (member) {
            member
                .addRole(roleAdd)
                .catch((_error) => {
                    message.channel.send(
                        `:thumbsup: ${roleAdd} was added to ${member.user.tag} by ${message.author}`
                    );
                })
                .then((member) => {
                    message.channel.send(
                        `:thumbsup: ${roleAdd} was added to ${member.user.tag} by ${message.author}`
                    );
                });
        }
    }
    if (command === "remove") {
        if (!message.member.hasPermission("MANAGE_ROLES"))
            return message.channel.send(":no_entry: Insufficient permissions");
        const member = message.mentions.members.first();
        if (!member)
            return message.channel.send(":no_entry: No user mentioned");
        const remove = args.slice(1).join(" ");
        if (!remove) return message.channel.send(":no_entry: No role said");
        const roleRemove = message.guild.roles.find(
            (role) => role.name === remove
        );
        if (!roleRemove)
            return message.channel.send(":no_entry: Role does not exist");
        if (!member.roles.has(roleRemove.id)) {
            return message.channel.send(
                ":no_entry: User already does not have that role role"
            );
        }
        if (member) {
            member
                .removeRole(roleRemove)
                .catch((_err) => {
                    message.channel.send(
                        `:thumbsup: ${roleRemove} was removed from @${member.user.tag} by ${message.author}`
                    );
                })
                .then((message) => {
                    message.channel.send(
                        `:thumbsup: ${roleRemove} removed from an Admin`
                    );
                });
        }
    }

    if (command === "rps") {
        const options = [
            "rock :shell: ",
            "paper :newspaper2:",
            "scissors :scissors: ",
        ];
        const option = options[Math.floor(Math.random() * options.length)];
        message.channel.send(`You got ${option}`);
    }

    if (command === "uptime") {
        let totalSeconds = bot.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds / 60;
        message.channel.send(
            `:low_brightness: **Uptime:** ${days} days, ${hours} hours and ${minutes} minutes!`
        );
    }

    if (command === "purge") {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send(
                ":no_entry: Insufficient Permissions! Only Moderators' can use this command!"
            );
        }

        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            const args = message.content.split(" ").slice(1);
            const amount = args.join(" ");

            if (!amount)
                return message.channel.send(
                    "You haven't given an amount of messages which should be deleted!"
                );
            if (isNaN(amount))
                return message.channel.send(
                    "The amount parameter isn`t a number!"
                );

            if (amount > 100)
                return message.channel.send(
                    "You can`t delete more than 100 messages at once!"
                );
            if (amount < 1)
                return message.channel.send(
                    "You have to delete at least 1 message!"
                );

            message.channel.messages.get({ limit: amount });
            message.channel.bulkDelete(amount);

            const purgeEmbed = new Discord.RichEmbed()
                .setTitle("Operation Succesful")
                .setAuthor(`By ${message.author.tag}`)
                .setDescription(
                    `${amount} Messages has been deleted! by ${message.author.tag}`
                )
                .setColor("RANDOM")
                .setThumbnail(message.author.avatarURL);

            message.channel.send(purgeEmbed);

            setTimeout(() => bot.user.lastMessage.delete(1), 5000);
        }
    }

    if (command === "country") {
        const query = args.shift();

        try {
            const { body } = await request.get(
                `https://restcountries.eu/rest/v2/name/${query}`
            );
            const data = body[0];
            const embed = new Discord.RichEmbed()
                .setColor(0x00ae86)
                .setTitle(data.name)
                .setThumbnail(
                    `https://www.countryflags.io/${data.alpha2Code}/flat/64.png`
                )
                .addField("❯ Population", formatter(data.population), true)
                .addField("❯ Capital", data.capital || "None", true)
                .addField("❯ Currency", data.currencies[0].symbol, true)
                .addField("❯ Location", data.subregion || data.region, true)
                .addField("❯ Demonym", data.demonym || "None", true)
                .addField("❯ Native Name", data.nativeName, true)
                .addField("❯ Area", `${formatter(data.area)}km`, true)
                .addField(
                    "❯ Languages",
                    data.languages.map((lang) => lang.name).join("/")
                );
            return message.channel.send(embed);
        } catch (err) {
            if (err.status === 404)
                return message.channel.send(
                    ":no_entry: Could not find any results."
                );
        }
    }
});
