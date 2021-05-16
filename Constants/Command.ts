import FalconClient from "../Classes/Client";
import { Message } from "discord.js";

interface RunFunction {
    // eslint-disable-next-line no-unused-vars
    (client: FalconClient, message: Message, args: string[]): Promise<any>,
}

interface Credit {
    name: string,
    reason: string,
    URL?: string,
};

export default interface Command {
    name: string,
    description: string,
    aliases?: string[],
    guildOnly?: boolean,
    ownerOnly?: boolean,
    disabled?: boolean,
    nsfw?: boolean,
    category?: string,
    cooldown?: number,
    credit?: Credit[],
    args?: number,
    run: RunFunction,
    // eslint-disable-next-line
}