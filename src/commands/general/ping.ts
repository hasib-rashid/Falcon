import { RunFunction } from '../../typings/command';

export const name: string = 'ping';
export const category: string = 'general';
export const description: string = 'Pong Command';

export const run: RunFunction = async (client, message) => {
    message.channel.send("Pong")
}
