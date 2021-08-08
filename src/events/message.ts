import { Message, TextChannel } from 'discord.js';
import { RunFunction } from '../typings/Event';
import { Command } from '../typings/Command';

export const name: string = 'messageCreate';
export const run: RunFunction = async (client, message: Message) => {
    console.log(message)
    if (!message.guild) return;

    if (message.author.bot) return;
    const Prefix = "."
    if (!message.content.toLowerCase().startsWith(Prefix)) return;
    const [cmd, ...args]: string[] = message.content
        .slice(Prefix.length)
        .trim()
        .split(/ +/g);
    const command: Command =
        client.commands.get(cmd.toLowerCase()) ||
        client.commands.get(client.aliases.get(cmd.toLowerCase()));
    if (client.config.onlyUsed) {
        if (!client.config.onlyUsed.includes(message.author.id)) return;
    }
    if (!cmd.length) return;

    command.run(client, message, args).catch((e: Error) => {
        client.logger.error(e)
        return (
            (client.channels.cache.get('866620950841131018') as TextChannel).send(`
            Command Name: ${command.name}
            Error: ${e.message}
            `)
        )
    });
};