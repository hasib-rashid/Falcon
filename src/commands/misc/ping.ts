import { RunFunction } from '../../interfaces/Command'; 

export const name = 'ping'
export const category = 'misc'
export const description = 'Description'

export const run: RunFunction = async (client, message, args) => {
   message.channel.send(client.ws.ping)
}