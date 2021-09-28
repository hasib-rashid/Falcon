import { CommandInteraction, Interaction, Message, TextChannel } from "discord.js";
import consola from 'consola'
import BaseEvent from "../base/BaseEvent";
import Falcon from "../base/Client";

export default class MessageCreateEvent extends BaseEvent {
    constructor(client: Falcon) {
        super(client, "messageCreate");
    }

    public async run(message: Message) {
        try {
            if (message.partial) await message.fetch();
            if (message.member?.partial) await message.member.fetch();
            if (!message.guild) return;
            if (message.author.bot) return;

            const Prefix = "!"

            if (!message.content.toLowerCase().startsWith(Prefix)) return;
            const [cmd, ...args]: string[] = message.content
                .slice(Prefix.length)
                .trim()
                .split(/ +/g);

            const command: any = this.client.commands.get(cmd.toLowerCase())

            if (!cmd.length) return;
            if (command) {
                command.run(this.client, message, args).catch((e: Error) => {
                    consola.error(e);
                    message.channel
                        .send(
                            "Error Occured"
                        )
                        .catch(() => consola.error("Can't send error message"));
                    if (e?.message?.toLowerCase()?.includes('missing permissions') || false)
                        return;
                    return (
                        this.client.channels.cache.get('875785159331434607') as TextChannel
                    ).send(
                        "Error Occured"
                    );
                });
            }
        } catch (err) {

        }
    }

    private async __handleCommand(message: Message) {
        try {
        }
        catch (err) {
            this.client.logger.error("this.client/commands", (err as Error).message, (err as Error).stack);
        }
    }
}