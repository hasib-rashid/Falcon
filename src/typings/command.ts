import { Message } from 'discord.js';
import { Falcon } from '../classes/client';

export interface RunFunction {
    (client: Falcon, message: Message, args: string[]): Promise<unknown>;
}

export interface Command {
    name: string;
    run: RunFunction;
    aliases?: string[];
    description: string;
    cooldown?: number;
    category: string;
    userPermissions?: string | string[];
    ownerOnly?: boolean;
    usage?: string;
}
