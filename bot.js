const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

bot.login(config.token);

bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity(`${bot.channels.size} Channels | !help`, {
        type: "WATCHING",
    });
});

bot.on("guildCreate", (guild) => {
    guild.createRole({ name: "Muted", color: "#313131" });
    console.log("Joined a new server: " + guild.name);
    console.log("It has " + guild.memberCount + " members ;)");
});

bot.on("guildDelete", (guild) => {
    console.log("Left the server:" + guild.name);
});

bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();

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

    if (command === "testcmd") {
        message.channel.send(
            "<a:right:789893445207851070> Welcome to the Server"
        );
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

            setInterval({
                message,
            });
            message.channel.send(`${amount} Messages has been deleted!`);
        }
    }
});
