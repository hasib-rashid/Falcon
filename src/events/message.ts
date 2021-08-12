import dotenv from 'dotenv'
dotenv.config()
import { Message } from "discord.js";
// @ts-ignore
import Event from "../typings/event";
import Collection from "@discordjs/collection";
import { Deta } from 'deta'
import { ENV } from '../classes/env';
const deta = Deta(ENV.db)
const guildModel = deta.Base("guild")
const blacklistModel = deta.Base("blacklist")

const cooldowns: Collection<string, Collection<string, number>> = new Collection();

const MessageEvent: Event = {
    name: "message",
    async run(client, message: Message) {
        if (message.author.bot || message.webhookID) return;

        const guildCache = await guildModel.fetch({ guildID: message.guild.id })

        let prefix: any;

        try {
            prefix = guildCache.items[0].prefix
        } catch (err) {
            prefix = client.prefix
        }

        if (!message.content.includes(prefix)) return;

        if (message.content === prefix[0]) return;

        if (!message.content.toLowerCase().startsWith(prefix[0].toLowerCase())) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        const commandName = args.shift()?.toLowerCase();

        const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

        if (!command) return;

        if (message.content === `${prefix[0]}${command.name}`) {
            blacklistModel.fetch({ userID: message.author.id }).then((res) => {
                if (message.author.id === res.items[0].userID) {
                    message.channel.send(`**<@${message.author.id}> you have been blacklisted by the owner. Check your dm's to see how to get whitelisted again**`);
                }
            }).catch((err) => {
                if (command.guildOnly && !message.guild) return message.channel.send(`${client.emotes.error} This command can only be used in Servers!`);

                if (command.ownerOnly && message.author.id !== client.ownerID) return message.channel.send(`**${client.emotes.error} To use this command, you need to be as **crazy** and **nerdy** as my Owner**`);
        
                if (command.disabled) return message.channel.send(`**${client.emotes.error} The command has been disabled by the owner**`);
        
                // @ts-ignore
                if (command.nsfw && (!message.guild || !message.channel.nsfw)) return message.channel.send(`**${client.emotes.error} This command can only be used in a NSFW Channel.**`);
        
                if (!!command.args && !args[command.args - 1]) return message.channel.send(`${client.emotes.error} Expected ${command.args} arguments, received ${args.length}`);
                if (!cooldowns.has(command.name)) {
                    cooldowns.set(command.name, new Collection());
                }
        
                const now = Date.now();
                const timestamps = cooldowns.get(command.name);
                const cooldownAmount = (command.cooldown || 3) * 1000;
        
                if (timestamps?.has(message.author.id)) {
                    // @ts-ignore
                    const expirationStamp = timestamps.get(message.author.id) + cooldownAmount;
        
                    // @ts-ignore
                    if (now < expirationStamp) return message.channel.send(`Please wait for ${((expirationStamp - now) / 1000).toFixed(2)} seconds before trying to use the command again.`);
                }
        
                timestamps?.set(message.author.id, now);
        
                setTimeout(() => timestamps?.delete(message.author.id), cooldownAmount);
        
                try {
                    command.run(client, message, args);
                }
                catch (err) {
                    client.logger.error("client/commands", `
                        Command Name: ${command.name}
                        Error: ${err.message}
                    `);
                }
            })
        }
    },
};

export default MessageEvent;