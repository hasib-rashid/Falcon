import { CommandInteraction, Interaction, Message, TextChannel } from "discord.js";
import consola from 'consola'
import BaseEvent from "../base/BaseEvent";
import { Command } from '../interfaces/Command';
import CodeFictionist from "../base/this.client";
import { Anything } from "../interfaces/Anything";

export default class MessageCreateEvent extends BaseEvent {
    constructor(client: CodeFictionist) {
        super(client, "messageCreate");
    }

    public async run(message: Message) {
        try {
            if (message.partial) await message.fetch();
            if (message.member?.partial) await message.member.fetch();
            if (!message.guild) return;
            if (message.author.bot) return;

            const Prefix = "."

            if (!message.content.toLowerCase().startsWith(Prefix)) return;
            const [cmd, ...args]: string[] = message.content
                .slice(Prefix.length)
                .trim()
                .split(/ +/g);

            const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));

            if (this.client.config.onlyUsed) {
                if (!this.client.config.onlyUsed.includes(message.author.id)) return;
            }

            if (!cmd.length) return;
            if (command) {
                if (
                    command.ownerOnly &&
                    command.ownerOnly == true &&
                    !this.client.owners.includes(message.author.id)
                )
                    return;
                if (this.client.cooldowns.has(`${message.author.id}${command.name}`)) {
                    const cooldownTime: string = this.client.utils.formatMS(
                        this.client.cooldowns.get(`${message.author.id}${command.name}`) - Date.now()
                    );
                    return message.channel.send(`**You can use this command again in \`${cooldownTime.split('').length == 0 ? '1 second' : cooldownTime}\`**`)
                }
                this.client.cooldowns.set(
                    `${message.author.id}${command.name}`,
                    this.client.utils.checkMultipleRoles('784470505607528448', message.author.id, [
                        '787656384808353803',
                        '787656420258086922',
                        '787656471679991829',
                    ])
                        ? Date.now() + command?.cooldown / 2
                        : Date.now() + command?.cooldown
                );

                command.run(this.client, message, args).catch((e: Error) => {
                    this.client.logger.error(e);
                    message.channel
                        .send(
                            this.client.embed(
                                {
                                    title: `❌ An error came about..`,
                                    description: `\`\`\`\n${e.message}\`\`\`\nPlease join [Falcon Support](https://discord.gg/22TtDpJcNE) and report it.`,
                                },
                                message
                            )
                        )
                        .catch(() => this.client.logger.error("Can't send error message"));
                    if (e?.message?.toLowerCase()?.includes('missing permissions') || false)
                        return;
                    return (
                        this.client.channels.cache.get('875785159331434607') as TextChannel
                    ).send(
                        this.client.embed(
                            {
                                title: `❌ An error came about..`,
                                description: `\`\`\`\n${e.stack}\`\`\`\n\`\`\`\n${e.message
                                    }\`\`\`\nNOTES: GID: ${message.guild.id} | UID: ${message.author.id
                                    } | CMD: ${command.name} | ARGS: ${args.join(' ')}`,
                            },
                            message
                        )
                    );
                });

                setTimeout(
                    () => {
                        this.client.cooldowns.delete(`${message.author.id}${command.name}`);
                    },
                    this.client.utils.checkMultipleRoles('784470505607528448', message.author.id, [
                        '787656384808353803',
                        '787656420258086922',
                        '787656471679991829',
                    ])
                        ? command?.cooldown / 2
                        : command?.cooldown
                );

                if (command.userPermissions) {
                    if (!message.member.permissions.has(command.userPermissions))
                        return message.channel.send(
                            this.client.embed(
                                {
                                    color: "BLUE",
                                    description: `You need to have ${typeof command.userPermissions == 'string' ||
                                        command.userPermissions.length == 1
                                        ? `\`${typeof command.userPermissions == 'string'
                                            ? command.userPermissions
                                                .replace(/_/gi, ' ')
                                                .split(/ +/g)
                                                .map(
                                                    (value: string) =>
                                                        value[0].toUpperCase() +
                                                        value.slice(1).toLowerCase()
                                                )
                                                .join(' ')
                                            : command.userPermissions[0]
                                                .replace(/_/gi, ' ')
                                                .split(/ +/g)
                                                .map(
                                                    (value: string) =>
                                                        value[0].toUpperCase() +
                                                        value.slice(1).toLowerCase()
                                                )
                                                .join(' ')
                                        }\``
                                        : `all of these permissions: ${command.userPermissions
                                            .map(
                                                (value: string) =>
                                                    `\`${value
                                                        .toLowerCase()
                                                        .replace(/_/gi, ' ')
                                                        .split(/ +/g)
                                                        .map(
                                                            (value: string) =>
                                                                value[0].toUpperCase() +
                                                                value.slice(1).toLowerCase()
                                                        )
                                                        .join(' ')}\``
                                            )
                                            .join(', ')}`
                                        }`,
                                    title: `❌ You can't use that!`,
                                },
                                message
                            )
                        );
                }
            }
        } catch (err) {

        }
    }

    private async __handleCommand(message: Message) {
        try {
        }
        catch (err) {
            this.this.client.logger.error("this.this.client/commands", (err as Error).message, (err as Error).stack);
        }
    }
}