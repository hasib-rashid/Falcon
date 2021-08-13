import { RunFunction } from '../../interfaces/Command'; 

export default {
   name: 'ping',
   category: 'misc',
   description: 'Check the ping of the websocket and the bot',
}

export const run: RunFunction = async (client, message, args) => {
	message.channel.send(`Websocket ping is ${client.ws.ping}`)
}