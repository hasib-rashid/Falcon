import { RunFunction } from '../../interfaces/Command';

export const name = 'comingsoon'
export const category = 'events'
export const description = 'Event is Coming Soon stay Tuned'

export const run: RunFunction = async (client, message, args) => {
    message.channel.send("**Event Commands are coming soon. Stay Tuned ;)**")
}